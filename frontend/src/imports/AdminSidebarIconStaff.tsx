import svgPaths from "./AdminSidebarStaffIconPaths";
import { imgGroup } from "./AdminSidebarStaffIconMask";

function Group() {
  return (
    <div className="absolute bottom-[5.5%] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.614px] mask-size-[31.605px_20.296px] right-[1.86%] top-[50.49%]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 20">
        <g id="Group">
          <path d={svgPaths.p3d52fb00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute bottom-[5.81%] contents left-0 right-[1.23%] top-[49.12%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

export default function AdminSidebarIconStaff() {
  return (
    <div className="relative size-full" data-name="STAFF">
      <div className="absolute inset-[6.47%_24.48%_55.94%_22.62%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 17">
          <path d={svgPaths.p6b05e80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup />
    </div>
  );
}
