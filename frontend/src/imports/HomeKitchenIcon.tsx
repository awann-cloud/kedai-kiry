import KitchenReceiptIconPaths from "./KitchenReceiptIconPaths";

export default function HomeKitchenIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 49 42">
      <mask height="42" id="mask_kitchen_icon" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="49" x="0" y="0">
        <path d="M0 0H48.875V41.8906H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask_kitchen_icon)">
        <path d={KitchenReceiptIconPaths.p9777f80} fill="white" />
        <path d={KitchenReceiptIconPaths.p3f72a940} fill="white" />
      </g>
    </svg>
  );
}
