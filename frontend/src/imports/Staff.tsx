import svgPaths from "./svg-chncqqvux4";
import imgRectangle26 from "figma:asset/26d51dfd5a4ae7c6e213b37324704f221ed8be4a.png";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.844px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[40.844px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Menu</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(126,42,126,0.4)] relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute box-border content-stretch flex h-[64px] items-center justify-between left-[6px] pb-px pt-0 px-[16px] top-[17px] w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none" />
      <Heading />
      <Button />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#4a1e69] h-[38px] left-0 rounded-[10px] top-0 w-[231px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[38px] items-center overflow-clip pl-[40px] pr-[12px] py-[8px] relative rounded-[inherit] w-[231px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] text-nowrap whitespace-pre">Search...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[71px] items-start left-[6px] pb-px pt-[16px] px-[12px] top-[91px] w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
            <path d={svgPaths.p12f93600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 18">
            <path d={svgPaths.p3656c470} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[37.531px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function SidebarItem() {
  return (
    <div className="absolute bg-purple-600 box-border content-stretch flex gap-[12px] h-[40px] items-center left-[18px] pl-[12px] pr-0 py-0 rounded-[10px] top-[190px] w-[231px]" data-name="SidebarItem">
      <Text />
      <Text1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 7">
            <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[39.406px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap whitespace-pre">Profile</p>
      </div>
    </div>
  );
}

function SidebarItem1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[40px] items-center left-[18px] pl-[12px] pr-0 py-0 rounded-[10px] top-[238px] w-[231px]" data-name="SidebarItem">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[87.5%_42.78%_8.33%_42.78%]" data-name="Vector">
        <div className="absolute inset-[-100.03%_-28.87%_-100.01%_-28.87%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p1f8ebe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_29.17%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 15">
            <path d={svgPaths.p259fd370} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap whitespace-pre">Employees List</p>
      </div>
    </div>
  );
}

function SidebarItem2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[40px] items-center left-[18px] px-[12px] py-0 rounded-[10px] top-[275px] w-[231px]" data-name="SidebarItem">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_12.5%_29.17%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-10%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
            <path d={svgPaths.p6680d80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[37.5%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2">
            <path d="M10.8333 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_62.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 17">
            <path d={svgPaths.p297e5680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[43.922px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap whitespace-pre">Logout</p>
      </div>
    </div>
  );
}

function SidebarItem3() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="SidebarItem">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[40px] items-start left-[22px] top-[311px] w-[231px]" data-name="Container">
      <SidebarItem3 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[1078px] top-[44px] w-[39.406px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap whitespace-pre">Home</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[1141px] top-[44px] w-[37.531px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Staff</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[324px] top-[91px] w-[37.531px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Dashboard</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-1/2 left-[20.61%] right-0 top-0" data-name="Group">
      <div className="absolute inset-[-1.85%_-1.17%_-1.85%_-1.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 28">
          <g id="Group">
            <path d={svgPaths.p2ca0a700} fill="var(--fill-0, #2DD4BF)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bottom-1/2 left-0 right-[68.37%] top-[9.55%]" data-name="Group">
      <div className="absolute inset-[-3.2%_-4.09%_-2.29%_-2.93%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 24">
          <g id="Group">
            <path d={svgPaths.p2acca4b0} fill="var(--fill-0, #FB923C)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute bottom-0 left-0 right-1/2 top-1/2" data-name="Group">
      <div className="absolute inset-[-1.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g id="Group">
            <path d={svgPaths.p29edab00} fill="var(--fill-0, #FBBF24)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-0 left-1/2 right-0 top-1/2" data-name="Group">
      <div className="absolute inset-[-1.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g id="Group">
            <path d={svgPaths.p1a2a500} fill="var(--fill-0, #A78BFA)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group4 />
    </div>
  );
}

function RechartsZindex100R() {
  return (
    <div className="absolute contents inset-0" data-name="recharts-zindex-100-:r197:">
      <Group5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[324px] overflow-clip size-[54px] top-[337px]" data-name="Icon">
      <RechartsZindex100R />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute bottom-1/2 left-[20.61%] right-0 top-0" data-name="Group">
      <div className="absolute inset-[-1.49%_-0.94%_-1.49%_-1.31%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55 35">
          <g id="Group">
            <path d={svgPaths.p11d22e80} fill="var(--fill-0, #2DD4BF)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute bottom-1/2 left-0 right-[68.37%] top-[9.55%]" data-name="Group">
      <div className="absolute inset-[-2.58%_-3.3%_-1.84%_-2.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 29">
          <g id="Group">
            <path d={svgPaths.p184f9080} fill="var(--fill-0, #FB923C)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute bottom-0 left-0 right-1/2 top-1/2" data-name="Group">
      <div className="absolute inset-[-1.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <g id="Group">
            <path d={svgPaths.p3b2d7100} fill="var(--fill-0, #FBBF24)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute bottom-0 left-1/2 right-0 top-1/2" data-name="Group">
      <div className="absolute inset-[-1.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <g id="Group">
            <path d={svgPaths.p3ebff880} fill="var(--fill-0, #A78BFA)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group10 />
    </div>
  );
}

function RechartsZindex100R1() {
  return (
    <div className="absolute contents inset-0" data-name="recharts-zindex-100-:r197:">
      <Group11 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[322px] overflow-clip size-[67px] top-[198px]" data-name="Icon">
      <RechartsZindex100R1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[124.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[10px] text-nowrap whitespace-pre">Kasir</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Text11 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#fdc700] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[101.922px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[10px] text-nowrap whitespace-pre">Kitchen</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Text12 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#00d5be] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[78.859px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[10px] text-nowrap whitespace-pre">Waiters</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Text13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[64px] items-start left-[398px] top-[198px] w-[89px]" data-name="Container">
      <Container5 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[124.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[10px] text-nowrap whitespace-pre">Kasir</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Text14 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#fdc700] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[101.922px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[10px] text-nowrap whitespace-pre">Kitchen</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Text15 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[42px] items-start left-[399px] top-[343px] w-[67px]" data-name="Container">
      <Container12 />
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-purple-600 h-[50px] left-[1011px] rounded-[10px] top-[457px] w-[204.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.3)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(173,70,255,0.2),0px_4px_6px_-4px_rgba(173,70,255,0.2)]" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[101.5px] text-[16px] text-center text-nowrap text-white top-[13px] translate-x-[-50%] whitespace-pre">Create</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-purple-600 h-[30px] left-[1010px] rounded-[10px] top-[614px] w-[71px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.3)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(173,70,255,0.2),0px_4px_6px_-4px_rgba(173,70,255,0.2)]" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[35.5px] text-[16px] text-center text-nowrap text-white top-[3px] translate-x-[-50%] whitespace-pre">Delete</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#541168] h-[30px] left-[1088px] rounded-[10px] top-[614px] w-[71px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.3)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(173,70,255,0.2),0px_4px_6px_-4px_rgba(173,70,255,0.2)]" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[36px] text-[16px] text-center text-nowrap text-white top-[3px] translate-x-[-50%] whitespace-pre">Edit</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#4a1e69] h-[1273px] left-0 top-0 w-[1280px]" />
      <div className="absolute bg-[#3c044d] h-[1273px] left-0 top-0 w-[266px]" />
      <Container />
      <Container2 />
      <SidebarItem />
      <SidebarItem1 />
      <SidebarItem2 />
      <Container3 />
      <div className="absolute bg-[#3c044d] h-[54px] left-[310px] rounded-[10px] top-[27px] w-[927px]" />
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[20px] left-[417px] not-italic text-[24px] text-center text-nowrap text-white top-[43px] translate-x-[-50%] whitespace-pre">Data Pegawai</p>
      <Text8 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[1129px] text-[14px] text-center text-nowrap text-white top-[44px] translate-x-[-50%] whitespace-pre">/</p>
      <Text9 />
      <Text10 />
      <div className="absolute h-[119px] left-[322px] top-[111px] w-[1251px]">
        <div className="absolute bottom-[-0.42%] left-0 right-0 top-[-0.42%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1251 120">
            <path d={svgPaths.p1d63a800} id="Line 1" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[rgba(126,42,126,0.5)] h-[108px] left-[310px] rounded-[10px] top-[302px] w-[172px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute bg-[rgba(126,42,126,0.5)] h-[108px] left-[493px] rounded-[10px] top-[303px] w-[174px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute bg-[rgba(126,42,126,0.5)] h-[266px] left-[684px] rounded-[10px] top-[145px] w-[553px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[960.5px] text-[14px] text-center text-nowrap text-white top-[152px] translate-x-[-50%] whitespace-pre">Total employee performance</p>
      <div className="absolute bg-[rgba(126,42,126,0.5)] h-[150px] left-[311px] rounded-[10px] top-[145px] w-[356px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[574.5px] text-[14px] text-center text-nowrap text-white top-[307px] translate-x-[-50%] whitespace-pre">{`Today's activities`}</p>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[393.5px] text-[14px] text-center text-nowrap text-white top-[307px] translate-x-[-50%] whitespace-pre">Gender</p>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[387px] text-[14px] text-center text-nowrap text-white top-[157px] translate-x-[-50%] whitespace-pre">Position</p>
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[20px] left-[574px] not-italic text-[48px] text-center text-nowrap text-white top-[354px] translate-x-[-50%] whitespace-pre">5</p>
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[20px] left-[574.5px] not-italic text-[48px] text-center text-nowrap text-white top-[222px] translate-x-[-50%] whitespace-pre">120</p>
      <div className="absolute h-[164px] left-[667px] top-[200px] w-[587px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle26} />
      </div>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[574px] text-[14px] text-center text-nowrap text-white top-[162px] translate-x-[-50%] whitespace-pre">Number of employees</p>
      <Icon6 />
      <Icon7 />
      <Container10 />
      <Container15 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[392px] not-italic text-[20px] text-center text-nowrap text-white top-[564px] translate-x-[-50%] whitespace-pre">ID</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[547.5px] not-italic text-[20px] text-center text-nowrap text-white top-[564px] translate-x-[-50%] whitespace-pre">Nama</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[792px] not-italic text-[20px] text-center text-nowrap text-white top-[564px] translate-x-[-50%] whitespace-pre">Position</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[1080.5px] not-italic text-[20px] text-center text-nowrap text-white top-[564px] translate-x-[-50%] whitespace-pre">Action</p>
      <Button1 />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.0023446595296263695)+(var(--transform-inner-height)*0.9999972581863403)))] items-center justify-center left-[344px] top-[600px] w-[calc(1px*((var(--transform-inner-height)*0.0023446595296263695)+(var(--transform-inner-width)*0.9999972581863403)))]" style={{ "--transform-inner-width": "853", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.134deg]">
          <div className="h-0 relative w-[853.002px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 853 1">
                <line id="Line 2" stroke="var(--stroke-0, #F9FAFB)" x2="853.002" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-[344px] top-[655px] w-[853px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 853 1">
            <line id="Line 3" stroke="var(--stroke-0, #F9FAFB)" x2="853" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[344px] top-[710px] w-[853px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 853 1">
            <line id="Line 3" stroke="var(--stroke-0, #F9FAFB)" x2="853" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[344px] top-[763px] w-[853px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 853 1">
            <line id="Line 3" stroke="var(--stroke-0, #F9FAFB)" x2="853" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[389.5px] not-italic text-[20px] text-center text-nowrap text-white top-[619px] translate-x-[-50%] whitespace-pre">001</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[541.5px] not-italic text-[20px] text-center text-nowrap text-white top-[620px] translate-x-[-50%] whitespace-pre">Jeffrey</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[20px] left-[790px] not-italic text-[20px] text-center text-nowrap text-white top-[619px] translate-x-[-50%] whitespace-pre">Kitchen</p>
      <Button2 />
      <Button3 />
    </div>
  );
}

export default function Staff() {
  return (
    <div className="relative size-full" data-name="Staff">
      <Group12 />
    </div>
  );
}