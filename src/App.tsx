import { useState } from 'react';
import { Shield, BookOpen, Users, HelpCircle, Download } from 'lucide-react';
import Modal from './components/Modal';
import SenderMode from './components/SenderMode';
import ReceiverMode from './components/ReceiverMode';
import ComparisonMode from './components/ComparisonMode';
import LearnModal from './components/LearnModal';
import DevelopedByModal from './components/DevelopedByModal';
import HelpModal from './components/HelpModal';

function App() {
  const [activeTab, setActiveTab] = useState<'sender' | 'receiver' | 'comparison'>('sender');
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleGenerateReport = (data: any) => {
    setReportData(data);
  };

  const downloadReport = async () => {
    if (!reportData) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/download-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Integrity_Report.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600" size={32} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">File Integrity Verification System</h1>
                <p className="text-xs text-gray-500">SHA-256 & HMAC-SHA-256 Based Security</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLearnModal(true)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen size={18} />
                <span className="font-medium">Learn</span>
              </button>
              <button
                onClick={() => setShowDevModal(true)}
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Users size={18} />
                <span className="font-medium">Developed By</span>
              </button>
              <button
                onClick={() => setShowHelpModal(true)}
                className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <HelpCircle size={18} />
                <span className="font-medium">Help</span>
              </button>
              {reportData && (
                <button
                  onClick={downloadReport}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 ml-2"
                >
                  <Download size={18} />
                  <span className="font-medium">Download</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('sender')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'sender'
                    ? 'bg-blue-600 text-white border-b-4 border-blue-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Sender Mode
              </button>
              <button
                onClick={() => setActiveTab('receiver')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'receiver'
                    ? 'bg-orange-600 text-white border-b-4 border-orange-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Receiver Mode
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === 'comparison'
                    ? 'bg-purple-600 text-white border-b-4 border-purple-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                File Comparison
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'sender' && <SenderMode onGenerateReport={handleGenerateReport} />}
            {activeTab === 'receiver' && <ReceiverMode onGenerateReport={handleGenerateReport} />}
            {activeTab === 'comparison' && <ComparisonMode onGenerateReport={handleGenerateReport} />}
          </div>
        </div>

        
      </main>

      <Modal
        isOpen={showLearnModal}
        onClose={() => setShowLearnModal(false)}
        title="Learn About File Integrity"
      >
        <LearnModal />
      </Modal>

      <Modal
        isOpen={showDevModal}
        onClose={() => setShowDevModal(false)}
        title="Development Team"
      >
        <DevelopedByModal />
      </Modal>

      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Help & Usage Instructions"
      >
        <HelpModal />
      </Modal>
    </div>
  );
}

export default App;
