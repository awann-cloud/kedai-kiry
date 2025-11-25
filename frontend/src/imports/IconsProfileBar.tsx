import svgPaths from "./BarProfileIconPaths";

export default function IconsProfileBar() {
  return (
    <div className="size-[80px]" data-name="Drink">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="Drink">
          <circle cx="40" cy="40" fill="var(--fill-0, #61428C)" id="Circle behind" r="40" />
          <g id="Bar Icon">
            <path d={svgPaths.p27360080} fill="var(--fill-0, white)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}