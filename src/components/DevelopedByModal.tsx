import professorImg from '../assets/images/professor.jpg';
import richikaImg from '../assets/images/richika.jpg';
import nandaniImg from '../assets/images/nandani.jpg';

export default function DevelopedByModal() {
  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-6 bg-gradient-to-br from-blue-50 via-white to-pink-50 border-2 border-blue-200 rounded-2xl">
      {/* Main Title */}
      

      {/* Developed By */}
      <div className="text-xl font-bold text-blue-800 mb-3 text-center">
        Developed By
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-12 w-full">
        {/* Developer 1 */}
        <div className="flex flex-col items-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 border-2 border-cyan-200 rounded-[2rem] w-72 max-w-full h-56 shadow-lg p-6">
          <img
            src={richikaImg}
            alt="Richika Rani"
            className="w-24 h-24 rounded-[1.3rem] object-cover border-2 border-cyan-300 mb-2"
          />
          <span className="font-sans text-base font-bold text-gray-900 mb-1">RICHIKA RANI</span>
          <span className="font-mono text-sm text-gray-600">24BCE1498</span>
        </div>
        {/* Developer 2 */}
        <div className="flex flex-col items-center bg-gradient-to-br from-white via-pink-50 to-fuchsia-50 border-2 border-pink-200 rounded-[2rem] w-72 max-w-full h-56 shadow-lg p-6">
          <img
            src={nandaniImg}
            alt="Nandani"
            className="w-24 h-24 rounded-[1.3rem] object-cover border-2 border-pink-300 mb-2"
          />
          <span className="font-sans text-base font-bold text-gray-900 mb-1">NANDANI</span>
          <span className="font-mono text-sm text-gray-600">24BCE1491</span>
        </div>
      </div>

      {/* Guided By */}
      <div className="text-xl font-bold text-blue-800 mb-3 text-center">
        Guided By
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center bg-gradient-to-br from-white via-indigo-50 to-blue-100 border-2 border-indigo-200 rounded-[2rem] w-[94%] max-w-2xl h-56 shadow-lg p-6">
          <img
            src={professorImg}
            alt="Dr. Swaminathan Annadurai"
            className="w-24 h-24 rounded-[1.3rem] object-cover border-2 border-indigo-200 mb-2"
          />
          <span className="font-sans text-base font-bold text-gray-900 mt-1">
            Dr. Swaminathan Annadurai
          </span>
          <span className="font-mono text-sm text-gray-700 text-center mt-1">
            Assistant Professor<br />
            Vellore Institute of Technology, Chennai
          </span>
        </div>
      </div>
    </div>
  );
}
