import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import BarDepartmentIconPaths from "./imports/BarDepartmentIcon";
import { imgGroup } from "./imports/PinFrameBackground";
import BackButton from "./imports/BackButton";
import { getPinForDepartment } from './data/pinCodes';

export default function PinEntryBar() {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const correctPin = getPinForDepartment('bar');

  const handleNumberClick = (num: string) => {
    const firstEmpty = pin.findIndex(p => p === '');
    if (firstEmpty !== -1) {
      const newPin = [...pin];
      newPin[firstEmpty] = num;
      setPin(newPin);
      
      // Check if PIN is complete
      if (firstEmpty === 3) {
        const enteredPin = newPin.join('');
        if (enteredPin === correctPin) {
          // Correct PIN - navigate to bar orders
          setTimeout(() => navigate('/barorders'), 300);
        } else {
          // Wrong PIN - show error and reset
          setError(true);
          setTimeout(() => {
            setPin(['', '', '', '']);
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleBackspace = () => {
    const lastFilled = pin.map((p, i) => p !== '' ? i : -1).filter(i => i !== -1).pop();
    if (lastFilled !== undefined) {
      const newPin = [...pin];
      newPin[lastFilled] = '';
      setPin(newPin);
      setError(false);
    }
  };

  const handleEnter = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
      if (enteredPin === correctPin) {
        navigate('/barorders');
      } else {
        setError(true);
        setTimeout(() => {
          setPin(['', '', '', '']);
          setError(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-[#4a1e69] relative w-full h-screen flex">
      {/* Back button in top-left */}
      <div className="absolute left-4 top-4 w-[80px] h-[80px] z-50">
        <BackButton />
      </div>

      {/* Left Side - Purple Section */}
      <div className="w-[46%] relative flex flex-col items-center justify-center">
        {/* Sparkle */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${imgGroup}')` }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 89">
            <g>
              <path d={PinPadBackgroundPaths.p3c8cbf0} fill="#B7C9FF" />
            </g>
          </svg>
        </div>

        {/* Bar/Drink Icon */}
        <div className="size-[160px] mb-8">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g id="bar">
              <circle cx="40" cy="40" fill="#61428C" id="Circle behind" r="40" />
              <g id="Bar Icon">
                <path d={BarDepartmentIconPaths.p27360080} fill="white" />
              </g>
            </g>
          </svg>
        </div>

        {/* Text */}
        <p className="text-white mt-8 mb-12">Masukkan Pin</p>

        {/* PIN Dots Display */}
        <div className="flex gap-4 mb-8">
          {pin.map((digit, index) => (
            <div
              key={index}
              className={`w-[80px] h-[80px] rounded-[20px] flex items-center justify-center transition-all ${
                error 
                  ? 'bg-red-400 border-4 border-red-600' 
                  : digit !== '' 
                    ? 'bg-white border-4 border-[#541168]' 
                    : 'bg-[#624384] border-4 border-[#8b6dac]'
              }`}
            >
              {digit !== '' && (
                <div className={`w-4 h-4 rounded-full ${error ? 'bg-red-800' : 'bg-[#541168]'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Forgot PIN Text */}
        <p className="text-white text-sm">Lupa Pin?</p>
      </div>

      {/* Right Side - White Keypad */}
      <div className="w-[54%] bg-[#f9fafb] relative">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-[2px] bg-[#541168] p-[2px]">
          {/* Numbers 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="bg-[#f9fafb] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-[80px] text-[#541168]">{num}</span>
            </button>
          ))}

          {/* Bottom Row: Backspace, 0, ENTER */}
          <button
            onClick={handleBackspace}
            className="bg-[#f9fafb] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M20 40L40 25L40 35L60 35L60 45L40 45L40 55L20 40Z" fill="#541168"/>
            </svg>
          </button>

          <button
            onClick={() => handleNumberClick('0')}
            className="bg-[#f9fafb] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-[80px] text-[#541168]">0</span>
          </button>

          <button
            onClick={handleEnter}
            className="bg-[#f9fafb] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-[32px] text-[#541168]">ENTER</span>
          </button>
        </div>
      </div>
    </div>
  );
}