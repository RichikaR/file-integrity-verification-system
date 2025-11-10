import { useState } from 'react';
import { Upload, Copy, Check, FileCheck } from 'lucide-react';

interface SenderResult {
  fileName: string;
  fileSize: number;
  sha256: string;
  hmac: string;
  salt: string;
  verificationCode: string;
}

interface SenderModeProps {
  onGenerateReport: (data: any) => void;
}

export default function SenderMode({ onGenerateReport }: SenderModeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SenderResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleGenerateCode = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-code`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate verification code');
      }

      const data = await response.json();
      setResult(data);
      onGenerateReport({
        type: 'sender',
        ...data
      });
    } catch (err) {
      setError('Error generating verification code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.verificationCode) {
      navigator.clipboard.writeText(result.verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileCheck className="text-blue-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-blue-900">Sender Instructions</h3>
            <p className="text-sm text-blue-700 mt-1">
              Upload your original file to generate a verification code. Share this code with the receiver to verify file integrity after transmission.
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          id="sender-file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="sender-file" className="cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-700 font-medium mb-1">
            {file ? file.name : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-500">
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Maximum file size: 50 MB'}
          </p>
        </label>
      </div>

      <button
        onClick={handleGenerateCode}
        disabled={!file || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Generating...' : 'Generate Verification Code'}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg text-gray-900 border-b pb-2">Verification Results</h3>

          <div>
            <label className="text-sm font-semibold text-gray-600">File Name</label>
            <p className="text-gray-900 font-mono text-sm mt-1 break-all">{result.fileName}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">File Size</label>
            <p className="text-gray-900 mt-1">{result.fileSize} bytes ({(result.fileSize / 1024 / 1024).toFixed(2)} MB)</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">SHA-256 Hash</label>
            <p className="text-gray-900 font-mono text-xs mt-1 break-all bg-gray-50 p-2 rounded">{result.sha256}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">HMAC-SHA-256</label>
            <p className="text-gray-900 font-mono text-xs mt-1 break-all bg-gray-50 p-2 rounded">{result.hmac}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Salt (Hex)</label>
            <p className="text-gray-900 font-mono text-xs mt-1 break-all bg-gray-50 p-2 rounded">{result.salt}</p>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-lg p-4">
            <label className="text-sm font-semibold text-green-800 block mb-2">Verification Code (Share with Receiver)</label>
            <div className="flex items-center gap-2">
              <p className="text-green-900 font-mono text-lg font-bold flex-1">{result.verificationCode}</p>
              <button
                onClick={copyToClipboard}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
