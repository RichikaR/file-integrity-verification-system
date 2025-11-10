import { useState } from 'react';
import { Upload, CheckCircle, XCircle, FileCheck } from 'lucide-react';

interface ReceiverResult {
  fileName: string;
  fileSize: number;
  match: boolean;
  computedCode: string;
  sha256: string;
  hmac: string;
}

interface ReceiverModeProps {
  senderSalt?: string;
  onGenerateReport: (data: any) => void;
}

export default function ReceiverMode({ senderSalt, onGenerateReport }: ReceiverModeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState('');
  const [salt, setSalt] = useState(senderSalt || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReceiverResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleVerify = async () => {
    if (!file || !code || !salt) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('code', code);
    formData.append('salt', salt);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verify-code`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to verify file');
      }

      const data = await response.json();
      setResult(data);
      onGenerateReport({
        type: 'receiver',
        providedCode: code,
        salt,
        ...data
      });
    } catch (err) {
      setError('Error verifying file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileCheck className="text-orange-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-orange-900">Receiver Instructions</h3>
            <p className="text-sm text-orange-700 mt-1">
              Upload the received file and enter the verification code and salt from the sender to check if the file has been corrupted during transmission.
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
        <input
          type="file"
          id="receiver-file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="receiver-file" className="cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-700 font-medium mb-1">
            {file ? file.name : 'Click to upload received file'}
          </p>
          <p className="text-sm text-gray-500">
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Maximum file size: 50 MB'}
          </p>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Verification Code (from Sender)
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 16-character verification code"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Salt (from Sender)
        </label>
        <input
          type="text"
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
          placeholder="Enter salt value (32 hex characters)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <button
        onClick={handleVerify}
        disabled={!file || !code || !salt || loading}
        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Verifying...' : 'Verify File'}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className={`rounded-lg p-4 ${result.match ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
            <div className="flex items-center gap-3">
              {result.match ? (
                <CheckCircle className="text-green-600" size={32} />
              ) : (
                <XCircle className="text-red-600" size={32} />
              )}
              <div>
                <h3 className={`font-bold text-lg ${result.match ? 'text-green-900' : 'text-red-900'}`}>
                  {result.match ? 'File Integrity Maintained' : 'File Corrupted'}
                </h3>
                <p className={`text-sm ${result.match ? 'text-green-700' : 'text-red-700'}`}>
                  {result.match
                    ? 'The file has not been altered during transmission.'
                    : 'The file appears to have been corrupted or tampered with.'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">File Name</label>
            <p className="text-gray-900 font-mono text-sm mt-1 break-all">{result.fileName}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">File Size</label>
            <p className="text-gray-900 mt-1">{result.fileSize} bytes ({(result.fileSize / 1024 / 1024).toFixed(2)} MB)</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Computed Verification Code</label>
            <p className="text-gray-900 font-mono text-lg mt-1 break-all bg-gray-50 p-2 rounded font-bold">{result.computedCode}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">SHA-256 Hash</label>
            <p className="text-gray-900 font-mono text-xs mt-1 break-all bg-gray-50 p-2 rounded">{result.sha256}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">HMAC-SHA-256</label>
            <p className="text-gray-900 font-mono text-xs mt-1 break-all bg-gray-50 p-2 rounded">{result.hmac}</p>
          </div>
        </div>
      )}
    </div>
  );
}
