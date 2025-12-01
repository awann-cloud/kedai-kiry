import svgPaths from "./Group22Paths";
import { imgGroup } from "./Group22Mask";

function Group() {
  return (
    <div className="absolute inset-[0.04%_94.32%_88.38%_0.18%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.098px_-0.212px] mask-size-[58.23px_58.987px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 61">
        <g id="Group">
          <path d={svgPaths.p15bd6600} fill="var(--fill-0, #B7C9FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SparkleBlue() {
  return (
    <div className="absolute bottom-[88.63%] contents left-[0.28%] right-[94.35%] top-0" data-name="SPARKLE BLUE">
      <Group />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[3px] top-0">
      <SparkleBlue />
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] h-[46px] justify-center leading-[0] left-[76px] not-italic text-[32px] text-white top-[29px] translate-y-[-50%] w-[428px]">
        <p className="leading-[normal]">Menu Review</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-purple-600 h-[28px] relative rounded-[10px] shrink-0 w-[68.313px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[68.313px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Today</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[101.797px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[101.797px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">This Month</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[81.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[81.203px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">Lifetime</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="[grid-area:1_/_1] h-[80px] ml-[20.61%] mt-0 relative w-[142.107px]" data-name="Group">
      <div className="absolute inset-[-0.62%_-0.35%_-0.63%_-0.52%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144 81">
          <g id="Group">
            <path d={svgPaths.p1b1e1d80} fill="var(--fill-0, #2DD4BF)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="[grid-area:1_/_1] h-[64.721px] ml-0 mt-[9.55%] relative w-[56.621px]" data-name="Group">
      <div className="absolute inset-[-1.03%_-1.3%_-0.77%_-0.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58 66">
          <g id="Group">
            <path d={svgPaths.p1eb15871} fill="var(--fill-0, #FB923C)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="[grid-area:1_/_1] h-[80px] ml-0 mt-1/2 relative w-[89.5px]" data-name="Group">
      <div className="absolute inset-[-0.63%_-0.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91 81">
          <g id="Group">
            <path d={svgPaths.p1480c900} fill="var(--fill-0, #FBBF24)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="[grid-area:1_/_1] h-[80px] ml-1/2 mt-1/2 relative w-[89.5px]" data-name="Group">
      <div className="absolute inset-[-0.63%_-0.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91 81">
          <g id="Group">
            <path d={svgPaths.p7611900} fill="var(--fill-0, #A78BFA)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group5 />
    </div>
  );
}

function RechartsZindex100R() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="recharts-zindex-100-:r197:">
      <Group6 />
    </div>
  );
}

function Icon() {
  return (
    <div className="box-border content-stretch flex h-[172px] items-start overflow-clip p-px relative shrink-0 w-[183px]" data-name="Icon">
      <RechartsZindex100R />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[20px] text-white">Order Total: 247</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[135.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[135.172px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Made Very Late</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Text />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[96.734px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Sent Late</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Text1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[126.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[126.813px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Early/On Time</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Text2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[120px] items-start relative shrink-0 w-[167px]" data-name="Container">
      <Heading />
      <Container7 />
    </div>
  );
}

function OrderTotalChart() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.5)] box-border content-stretch flex flex-col gap-[24px] h-[436px] items-center left-0 pb-px pt-[25px] px-[25px] rounded-[16px] top-[81px] w-[323px]" data-name="OrderTotalChart">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container />
      <Icon />
      <Container8 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-purple-600 h-[28px] relative rounded-[10px] shrink-0 w-[68.313px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[68.313px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Today</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[101.797px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[101.797px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">This Month</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[81.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[81.203px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">Lifetime</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-start left-[25px] top-[25px] w-[572px]" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[25px] top-[77px] w-[572px]" data-name="Heading 3">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[20px] text-white">Top Rated Menu</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[65.83%_92.44%_2.5%_2.84%]" data-name="Group">
      <div className="absolute inset-[65.83%_92.44%_2.5%_2.84%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 64">
          <path d={svgPaths.p108ace00} fill="var(--fill-0, #FB923C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[57.92%_72.79%_2.5%_22.49%]" data-name="Group">
      <div className="absolute inset-[57.92%_72.79%_2.5%_22.49%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 80">
          <path d={svgPaths.p28d7ca80} fill="var(--fill-0, #FB923C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute bottom-[2.5%] contents left-[42.14%] right-[53.14%] top-1/2" data-name="Group">
      <div className="absolute bottom-[2.5%] left-[42.14%] right-[53.14%] top-1/2" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 95">
          <path d={svgPaths.p2f6ff500} fill="var(--fill-0, #FB923C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[34.17%_33.49%_2.5%_61.79%]" data-name="Group">
      <div className="absolute inset-[34.17%_33.49%_2.5%_61.79%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 127">
          <path d={svgPaths.p2c23f600} fill="var(--fill-0, #FB923C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[42.08%_13.84%_2.5%_81.44%]" data-name="Group">
      <div className="absolute inset-[42.08%_13.84%_2.5%_81.44%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 111">
          <path d={svgPaths.p3badab00} fill="var(--fill-0, #FB923C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="Group">
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
      <Group11 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function RechartsBarR19J() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="recharts-bar-:r19j:">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute bottom-[2.5%] contents left-[8.26%] right-[87.02%] top-1/2" data-name="Group">
      <div className="absolute bottom-[2.5%] left-[8.26%] right-[87.02%] top-1/2" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 95">
          <path d={svgPaths.p39a5b100} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[42.08%_67.37%_2.5%_27.91%]" data-name="Group">
      <div className="absolute inset-[42.08%_67.37%_2.5%_27.91%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 111">
          <path d={svgPaths.p3badab00} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[26.25%_47.72%_2.5%_47.56%]" data-name="Group">
      <div className="absolute inset-[26.25%_47.72%_2.5%_47.56%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 143">
          <path d={svgPaths.p777a980} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[2.5%_28.07%_2.5%_67.21%]" data-name="Group">
      <div className="absolute inset-[2.5%_28.07%_2.5%_67.21%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 190">
          <path d={svgPaths.pbc1ca00} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[10.42%_8.42%_2.5%_86.86%]" data-name="Group">
      <div className="absolute inset-[10.42%_8.42%_2.5%_86.86%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 175">
          <path d={svgPaths.p18a5cc00} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="Group">
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
      <Group19 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="Group">
      <Group20 />
    </div>
  );
}

function RechartsBarR19K() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="recharts-bar-:r19k:">
      <Group23 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[73.75%_81.6%_2.5%_13.68%]" data-name="Group">
      <div className="absolute inset-[73.75%_81.6%_2.5%_13.68%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 48">
          <path d={svgPaths.p22f4b600} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[65.83%_61.95%_2.5%_33.33%]" data-name="Group">
      <div className="absolute inset-[65.83%_61.95%_2.5%_33.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 64">
          <path d={svgPaths.p3248b800} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[57.92%_42.3%_2.5%_52.98%]" data-name="Group">
      <div className="absolute inset-[57.92%_42.3%_2.5%_52.98%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 80">
          <path d={svgPaths.p28d7ca80} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[42.08%_22.65%_2.5%_72.63%]" data-name="Group">
      <div className="absolute inset-[42.08%_22.65%_2.5%_72.63%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 111">
          <path d={svgPaths.p3badab00} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_92.28%]" data-name="Group">
      <div className="absolute inset-[26.25%_3%_2.5%_92.28%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 143">
          <path d={svgPaths.p777a980} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="Group">
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="Group">
      <Group29 />
    </div>
  );
}

function RechartsBarR19L() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="recharts-bar-:r19l:">
      <Group30 />
    </div>
  );
}

function RechartsZindex300R19O() {
  return (
    <div className="absolute contents inset-[2.5%_3%_2.5%_2.84%]" data-name="recharts-zindex-300-:r19o:">
      <RechartsBarR19J />
      <RechartsBarR19K />
      <RechartsBarR19L />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R19O />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[200px] items-start left-[25px] top-[121px] w-[572px]" data-name="Container">
      <Icon1 />
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

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[124.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Makanan</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Text3 />
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

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[101.922px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Minuman</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Text4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#00d5be] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[78.859px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Snack</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Text5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[76px] items-start left-[25px] top-[337px] w-[572px]" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute inset-[32.42%_-28.58%_22.49%_82.57%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333 198">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p3ed5f000} fill="var(--fill-0, #2DD4BF)" id="Vector" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p34583300} fill="var(--fill-0, #2DD4BF)" id="Vector_2" />
          </g>
          <path d={svgPaths.p1722e380} fill="var(--fill-0, #FBBF24)" id="Vector_3" />
          <g id="Group_4">
            <path d={svgPaths.p14ba600} fill="var(--fill-0, #FB923C)" id="Vector_4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function BestSellingChart() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.5)] h-[438px] left-[361px] rounded-[16px] top-[81px] w-[723px]" data-name="BestSellingChart">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container9 />
      <Heading1 />
      <Container10 />
      <Container17 />
      <Group31 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-0 top-[81px]">
      <OrderTotalChart />
      <BestSellingChart />
    </div>
  );
}

export default function Group22() {
  return (
    <div className="relative size-full">
      <Group18 />
      <Group21 />
    </div>
  );
}