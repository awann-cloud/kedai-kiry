import svgPaths from "./KitchenReceiptIconPaths";

export default function IconsReceiptMakanan() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 42">
      <mask height="42" id="mask_makanan_receipt" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="49" x="0" y="0">
        <path d="M0 0H48.875V41.8906H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask_makanan_receipt)">
        <path d={svgPaths.p9777f80} fill="#3C044D" />
        <path d={svgPaths.p3f72a940} fill="#3C044D" />
      </g>
    </svg>
  );
}