import { Shield, Lock, Hash, Key } from 'lucide-react';
import flowchartImg from '../assets/images/flowchart.png';

// Import demo video from src assets
import demoVideo from '../assets/videos/democn.mp4';

export default function LearnModal() {
  return (
    <div className="space-y-6">
      {/* Explanation Sections */}
      <div className="prose max-w-none">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mt-0 mb-4">What is File Integrity Verification?</h3>
          <p className="text-gray-700 leading-relaxed mb-0">
            File integrity verification ensures that a file has not been corrupted or tampered with during transmission or storage.
            This system uses cryptographic hashing techniques to create unique digital fingerprints of files that can be compared
            to verify authenticity and detect any modifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* SHA-256 Algorithm */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Hash className="text-blue-600" size={24} />
              <h4 className="text-lg font-bold text-gray-900 m-0">SHA-256 Algorithm</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              SHA-256 is a cryptographic hash function producing a 256-bit (64 hex char) unique fingerprint for any input.
              It's a one-way function; you can't extract original data from the hash.
              The algorithm processes data in 512-bit blocks through multiple rounds involving bitwise operations and modular arithmetic,
              ensuring collision resistance and preimage resistance.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              This makes it ideal for verifying file integrity: even small changes create completely different hashes.
            </p>
            <div className="mt-3 bg-gray-50 p-3 rounded">
              <p className="text-xs font-mono text-gray-600 mb-1">Example:</p>
              <p className="text-xs font-mono text-gray-900 break-all">
                Input: "Hello World"<br />
                SHA-256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
              </p>
            </div>
            <div className="mt-3">
              <h5 className="font-semibold mb-1">Learn more:</h5>
              <iframe
                className="w-full aspect-video rounded-lg"
                src="https://www.youtube.com/embed/orIgy2MjqrA"
                title="SHA-256 Complete Step-By-Step Explanation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* HMAC-SHA-256 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-green-600" size={24} />
              <h4 className="text-lg font-bold text-gray-900 m-0">HMAC-SHA-256</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Hash-based Message Authentication Code (HMAC) combines a secret key with SHA-256 hashing to verify data integrity and authenticity.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mt-2">
              Only parties with the secret key can generate or validate the HMAC, protecting against tampering and impersonation.
              It involves hashing the key and data in a nested structure for strong security guarantees.
            </p>
            <div className="mt-3 bg-gray-50 p-3 rounded">
              <p className="text-xs font-mono text-gray-600 mb-1">Formula:</p>
              <p className="text-xs font-mono text-gray-900">
                HMAC = SHA256((key ⊕ opad) || SHA256((key ⊕ ipad) || message))
              </p>
              <p className="text-xs text-gray-600 mt-1 italic">
                where ⊕ is XOR, and opad/ipad are padding constants
              </p>
            </div>
            <div className="mt-3">
              <h5 className="font-semibold mb-1">Learn more:</h5>
              <iframe
                className="w-full aspect-video rounded-lg"
                src="https://www.youtube.com/embed/vdzB5Rraeb4"
                title="HMAC & Message Authentication Codes Explanation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Salt */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Key className="text-purple-600" size={24} />
              <h4 className="text-lg font-bold text-gray-900 m-0">Salt</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Salt is random data added to inputs before hashing to ensure even identical inputs have different hashes.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              By generating a unique 16-byte salt for each file, this system thwarts rainbow table attacks and strengthens security.
            </p>
          </div>

          {/* How It Works */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-yellow-600" size={24} />
              <h4 className="text-lg font-bold text-gray-900 m-0">How It Works</h4>
            </div>
            <ol className="text-sm text-gray-700 space-y-2 ml-4">
              <li><strong>Sender Side:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Upload original file</li>
                  <li>• System computes SHA-256 hash of file content</li>
                  <li>• Random 16-byte salt is generated</li>
                  <li>• HMAC-SHA-256 is computed using hash + salt</li>
                  <li>• First 16 characters become verification code</li>
                  <li>• Share code and salt with receiver</li>
                </ul>
              </li>
              <li><strong>Receiver Side:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Upload received file</li>
                  <li>• Enter verification code and salt from sender</li>
                  <li>• System computes SHA-256 hash of received file</li>
                  <li>• HMAC is recomputed with provided salt</li>
                  <li>• Timing-safe comparison of codes</li>
                  <li>• Match = File intact ✓ | Mismatch = Corrupted ✗</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        {/* System Flow Diagram */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">System Flow Diagram</h4>
          <div className="bg-white rounded-lg overflow-hidden border border-gray-300">
            <img
              src={flowchartImg}
              alt="File Integrity Verification System Flow Diagram"
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center italic">
            Complete workflow showing Sender Mode, Receiver Mode, and Comparison Mode
          </p>
        </div>
      </div>

      {/* Video placed just above References */}
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-3">Project Video Demonstration</h2>
        <div className="w-full flex justify-center">
          <video
            controls
            className="rounded-lg border border-blue-100 shadow-lg max-w-2xl w-full bg-gray-100"
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* References Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-blue-700 mb-3">References</h2>
        <ul className="list-disc ml-8 space-y-1 text-gray-800">
          <li>
            Node.js Crypto Documentation: <a href="https://nodejs.org/api/crypto.html" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">https://nodejs.org/api/crypto.html</a>
          </li>
          <li>
            SHA(256): <a href="https://csrc.nist.gov/pubs/fips/180-4/upd1/final" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">National Institute of Standards and Technology. (2015). Secure Hash Standard (SHS). FIPS PUB 180-4, U.S. Department of Commerce, pp. 36.</a>
          </li>
          <li>
            HMAC: <a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-224.ipd.pdf" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Krawczyk, H., Bellare, M., &amp; Canetti, R. (1997). HMAC: Keyed-hashing for message authentication. RFC 2104,
              Internet Engineering Task Force, pp. 10.</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
