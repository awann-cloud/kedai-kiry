import BackButtonPaths from "./BackButtonPaths";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Back button clicked - navigating to home');
    navigate('/home');
  };

  return (
    <button 
      onClick={handleClick} 
      className="relative size-full cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0"
      data-name="Back Button"
      type="button"
    >
      <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 80 80">
        <g id="Back Button">
          <circle cx="40" cy="40" fill="#61428C" r="40" />
          <g id="Arrow" transform="translate(25, 22) scale(0.45)">
            <path d={BackButtonPaths.pf2bc572} fill="white" />
            <path d={BackButtonPaths.p18d70600} fill="black" />
            <path d={BackButtonPaths.p2e3ade80} fill="white" />
          </g>
        </g>
      </svg>
    </button>
  );
}