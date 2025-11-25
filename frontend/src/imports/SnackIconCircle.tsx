import svgPaths from "./SnackCircleIconPaths";

export default function SnackIconCircle() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 80 80">
      <g id="Snack">
        <circle cx="40" cy="40" fill="#61428C" id="Circle behind" r="40" />
        <g id="Frame 10">
          <g id="Vector">
            <path d={svgPaths.p16eba280} fill="white" />
            <path d={svgPaths.p26109580} fill="white" />
            <path d={svgPaths.p35b6d700} fill="white" />
            <path d={svgPaths.p128d1df0} fill="white" />
            <path d={svgPaths.p2ba7adf2} fill="white" />
            <path d={svgPaths.p11eba280} fill="white" />
            <path d={svgPaths.p1d957e00} fill="white" />
            <path d={svgPaths.p223aa700} fill="white" />
            <path d={svgPaths.pe4c4800} fill="white" />
            <path d={svgPaths.p91ed080} fill="white" />
            <path d={svgPaths.p12026900} fill="white" />
            <path d={svgPaths.p1d8cfe00} fill="white" />
          </g>
        </g>
      </g>
    </svg>
  );
}