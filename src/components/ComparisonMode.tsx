import { useState } from 'react';
import { Upload, CheckCircle, XCircle, FileCheck } from 'lucide-react';

interface ComparisonResult {
  match: boolean;
  file1: {
    name: string;
    sha256: string;
    hmac: string;
  };
  file2: {
    name: string;
    sha256: string;
    hmac: string;
  };
}

interface ComparisonModeProps {
  onGenerateReport: (data: any) => void;
}

export default function ComparisonMode({ onGenerateReport }: ComparisonModeProps) {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile1(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile2(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleCompare = async () => {
    if (!file1 || !file2) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/compare-files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to compare files');
      }

      const data = await response.json();
      setResult(data);
      onGenerateReport({
        type: 'comparison',
        match: data.match,
        file1Name: data.file1.name,
        file1Sha256: data.file1.sha256,
        file1Hmac: data.file1.hmac,
        file2Name: data.file2.name,
        file2Sha256: data.file2.sha256,
        file2Hmac: data.file2.hmac,
      });
    } catch (err) {
      setError('Error comparing files. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileCheck className="text-purple-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-purple-900">Direct File Comparison</h3>
            <p className="text-sm text-purple-700 mt-1">
              Upload two files to directly compare their cryptographic hashes. This method doesn't require verification codes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            id="compare-file1"
            onChange={handleFile1Change}
            className="hidden"
          />
          <label htmlFor="compare-file1" className="cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-2" size={40} />
            <p className="text-sm font-semibold text-gray-700 mb-1">File 1 (Original)</p>
            <p className="text-xs text-gray-600 mb-1">
              {file1 ? file1.name : 'Click to upload'}
            </p>
            <p className="text-xs text-gray-500">
              {file1 ? `${(file1.size / 1024 / 1024).toFixed(2)} MB` : 'Max: 50 MB'}
            </p>
          </label>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            id="compare-file2"
            onChange={handleFile2Change}
            className="hidden"
          />
          <label htmlFor="compare-file2" className="cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-2" size={40} />
            <p className="text-sm font-semibold text-gray-700 mb-1">File 2 (Received)</p>
            <p className="text-xs text-gray-600 mb-1">
              {file2 ? file2.name : 'Click to upload'}
            </p>
            <p className="text-xs text-gray-500">
              {file2 ? `${(file2.size / 1024 / 1024).toFixed(2)} MB` : 'Max: 50 MB'}
            </p>
          </label>
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={!file1 || !file2 || loading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Comparing...' : 'Compare Files'}
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
                  {result.match ? 'Files Are Identical' : 'Files Are Different'}
                </h3>
                <p className={`text-sm ${result.match ? 'text-green-700' : 'text-red-700'}`}>
                  {result.match
                    ? 'Both files have identical SHA-256 hashes.'
                    : 'The files have different content or have been modified.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">File 1</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Name</label>
                  <p className="text-sm text-gray-900 font-mono break-all">{result.file1.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">SHA-256</label>
                  <p className="text-xs text-gray-900 font-mono break-all bg-gray-50 p-2 rounded">{result.file1.sha256}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">HMAC</label>
                  <p className="text-xs text-gray-900 font-mono break-all bg-gray-50 p-2 rounded">{result.file1.hmac}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">File 2</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Name</label>
                  <p className="text-sm text-gray-900 font-mono break-all">{result.file2.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">SHA-256</label>
                  <p className="text-xs text-gray-900 font-mono break-all bg-gray-50 p-2 rounded">{result.file2.sha256}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">HMAC</label>
                  <p className="text-xs text-gray-900 font-mono break-all bg-gray-50 p-2 rounded">{result.file2.hmac}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
