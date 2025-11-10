import { HelpCircle, Send, Download } from 'lucide-react';

export default function HelpModal() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="text-orange-600" size={32} />
          <h3 className="text-2xl font-bold text-gray-900">How to Use This System</h3>
        </div>
        <p className="text-gray-700">
          Follow these step-by-step instructions to verify file integrity between sender and receiver.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Send className="text-blue-600" size={24} />
          <h4 className="text-xl font-bold text-gray-900">Sender Workflow</h4>
        </div>

        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Select Sender Mode</h5>
              <p className="text-sm text-gray-600 mt-1">
                Click on the "Sender" tab in the main interface.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Upload Your File</h5>
              <p className="text-sm text-gray-600 mt-1">
                Click the upload area or drag and drop your file. Maximum file size is 50 MB.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Generate Verification Code</h5>
              <p className="text-sm text-gray-600 mt-1">
                Click the "Generate Verification Code" button. The system will compute SHA-256, HMAC, and generate a salt.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Share Code and Salt</h5>
              <p className="text-sm text-gray-600 mt-1">
                Copy the 16-character verification code and the salt value. Share both with the receiver through a secure channel.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Download className="text-orange-600" size={24} />
          <h4 className="text-xl font-bold text-gray-900">Receiver Workflow</h4>
        </div>

        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Select Receiver Mode</h5>
              <p className="text-sm text-gray-600 mt-1">
                Click on the "Receiver" tab in the main interface.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Upload Received File</h5>
              <p className="text-sm text-gray-600 mt-1">
                Upload the file you received from the sender.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Enter Verification Details</h5>
              <p className="text-sm text-gray-600 mt-1">
                Input the 16-character verification code and the salt value provided by the sender.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900">Verify File Integrity</h5>
              <p className="text-sm text-gray-600 mt-1">
                Click "Verify File". The system will compare the codes using timing-safe comparison and display whether the file is intact or corrupted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-2">Alternative: Direct File Comparison</h4>
        <p className="text-sm text-gray-700">
          If you don't want to use verification codes, switch to the "File Comparison" tab. Upload both the original
          and received files, then click "Compare Files" to directly check if they're identical.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-2">Download Report</h4>
        <p className="text-sm text-gray-700">
          After any verification or comparison operation, you can download a detailed text report containing:
        </p>
        <ul className="text-sm text-gray-700 ml-6 mt-2 list-disc space-y-1">
          <li>File information and cryptographic hashes</li>
          <li>Verification results and match status</li>
          <li>Step-by-step explanation of the verification process</li>
          <li>Technical details about algorithms used</li>
        </ul>
        <p className="text-sm text-gray-700 mt-2">
          Click the "Download Report" button after completing a verification to generate and download the report.
        </p>
      </div>
    </div>
  );
}
