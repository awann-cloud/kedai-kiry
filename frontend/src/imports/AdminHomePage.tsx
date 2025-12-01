import svgPaths from "./svg-nijxhpontq";
import imgImage1 from "figma:asset/212b4e4699c6d2dd5d40172db45ae1dc976caef1.png";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3, imgGroup4, imgGroup5 } from "./AdminHomePageMasks";

function Group() {
  return (
    <div className="absolute inset-[15.05%_84.72%_82.95%_10.62%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.098px_-0.212px] mask-size-[58.231px_58.987px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 61">
        <g id="Group">
          <path d={svgPaths.p121c5c00} fill="var(--fill-0, #B7C9FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SparkleBlue() {
  return (
    <div className="absolute contents inset-[15.05%_84.75%_82.99%_10.7%]" data-name="SPARKLE BLUE">
      <Group />
    </div>
  );
}

function PickSection() {
  return (
    <div className="absolute contents left-[137px] top-[452px]" data-name="PICK SECTION">
      <SparkleBlue />
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] h-[46.131px] justify-center leading-[0] left-[210.36px] not-italic text-[32px] text-white top-[481.12px] translate-y-[-50%] w-[320.646px]">
        <p className="leading-[normal]">Active Orders</p>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[146px] top-[553px]">
      <div className="absolute bg-purple-600 h-[318.238px] left-[146px] rounded-[20px] top-[553px] w-[224.047px]" data-name="Makanan">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function ButtonMakanan() {
  return (
    <div className="absolute contents left-[181.66px] top-[791.68px]" data-name="Button Makanan">
      <div className="absolute bg-white inset-[26.35%_73.88%_71.94%_14.19%] rounded-[10px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <p className="absolute font-['Poppins:Bold',sans-serif] h-[32.921px] leading-[normal] left-[258.02px] not-italic text-[#3c044d] text-[24px] text-center top-[800.82px] translate-x-[-50%] w-[152.718px]">MAKANAN</p>
    </div>
  );
}

function FoodIocn() {
  return (
    <div className="absolute inset-[21.06%_74.69%_75.17%_14.98%]" data-name="Food Iocn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 114">
        <g id="Food Iocn">
          <mask height="114" id="mask0_4002_811" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="133" x="0" y="0">
            <g id="303cbfc917">
              <g id="Vector">
                <path d="M0 0H132.301V113.395H0V0Z" fill="var(--fill-0, white)" />
                <path d={svgPaths.p2ce4c000} stroke="var(--stroke-0, white)" />
              </g>
            </g>
          </mask>
          <g mask="url(#mask0_4002_811)">
            <g id="Group">
              <g id="Vector_2">
                <path d={svgPaths.p37542b70} fill="var(--fill-0, #FCDFFF)" />
                <path d={svgPaths.p162a9d00} stroke="var(--stroke-0, #FB64B6)" strokeOpacity="0.2" />
              </g>
            </g>
            <g id="Vector_3">
              <path d={svgPaths.p38571800} fill="var(--fill-0, #FCDFFF)" />
              <path d={svgPaths.p1bb34300} stroke="var(--stroke-0, #FB64B6)" strokeOpacity="0.2" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[146px] top-[553px]">
      <Group7 />
      <ButtonMakanan />
      <FoodIocn />
    </div>
  );
}

function BUttonFinsihed() {
  return (
    <div className="absolute contents left-[428.57px] top-[553px]" data-name="bUTTON FINSIHED">
      <div className="absolute bg-[rgba(126,42,126,0.25)] h-[318.238px] left-[428.57px] rounded-[20px] top-[553px] w-[224.047px]" data-name="BAR">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white inset-[26.35%_51.8%_71.94%_36.27%] rounded-[10px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <p className="absolute font-['Poppins:Bold',sans-serif] h-[32.921px] leading-[normal] left-[540.59px] not-italic text-[#3c044d] text-[24px] text-center top-[800.82px] translate-x-[-50%] w-[152.718px]">BAR</p>
    </div>
  );
}

function BarIcon() {
  return (
    <div className="absolute inset-[21.18%_55.16%_75.28%_39.55%]" data-name="Bar Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68 107">
        <g id="Bar Icon">
          <g id="Vector">
            <path d={svgPaths.p3c8ad700} fill="var(--fill-0, #FCDFFF)" />
            <path d={svgPaths.p16a0d900} stroke="var(--stroke-0, #FB64B6)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Bar() {
  return (
    <div className="absolute contents left-[428.57px] top-[553px]" data-name="BAR">
      <BUttonFinsihed />
      <BarIcon />
    </div>
  );
}

function ButtonSnack() {
  return (
    <div className="absolute contents left-[746.81px] top-[791.68px]" data-name="Button Snack">
      <div className="absolute bg-white inset-[26.35%_29.72%_71.94%_58.34%] rounded-[10px]" />
      <p className="absolute font-['Poppins:Bold',sans-serif] h-[32.921px] leading-[normal] left-[823.17px] not-italic text-[#3c044d] text-[24px] text-center top-[800.82px] translate-x-[-50%] w-[152.718px]">SNACK</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[24.02%_34.83%_75.63%_60.27%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.019px_-0.939px] mask-size-[63.417px_11.72px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 11">
        <g id="Group">
          <path d={svgPaths.p1e9e1480} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[23.99%_34.77%_75.62%_60.27%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[22.78%_31.8%_75.28%_63.83%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.652px_-0.755px] mask-size-[56.646px_59.087px]" data-name="Group" style={{ maskImage: `url('${imgGroup2}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 59">
        <g id="Group">
          <path d={svgPaths.p2673cd80} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[22.76%_31.8%_75.28%_63.78%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function LogoSnack() {
  return (
    <div className="absolute contents inset-[21.39%_31.8%_75.28%_60.27%]" data-name="Logo snack">
      <div className="absolute inset-[23.44%_35.2%_76.1%_60.64%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 14">
          <path d={svgPaths.p33aeb880} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[24.03%_35.08%_75.64%_64.88%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
          <path d={svgPaths.p3dc6dbc0} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup />
      <div className="absolute inset-[24.5%_35.18%_75.29%_60.62%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 7">
          <path d={svgPaths.p273911c0} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[23.94%_34.89%_76.06%_65.11%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
          <path d={svgPaths.p1679af00} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup1 />
      <div className="absolute inset-[21.89%_35.22%_77.34%_64%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 24">
          <path d={svgPaths.p31249c80} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[21.44%_34.23%_77.34%_65.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 37">
          <path d={svgPaths.p10141100} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[21.39%_33.19%_77.34%_66.26%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 39">
          <path d={svgPaths.p18c5b500} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[21.76%_32.08%_77.34%_67.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 27">
          <path d={svgPaths.p7f4cb00} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[24.03%_35.06%_75.64%_64.9%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
          <path d={svgPaths.p3475dd80} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[23.94%_34.87%_76.06%_65.13%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
          <path d={svgPaths.p1980a00} fill="var(--fill-0, #FCDFFF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Snack() {
  return (
    <div className="absolute contents left-[711.14px] top-[553px]" data-name="SNACK">
      <div className="absolute bg-[rgba(126,42,126,0.25)] h-[318.238px] left-[711.14px] rounded-[20px] top-[553px] w-[224.047px]" data-name="Snack">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <ButtonSnack />
      <LogoSnack />
    </div>
  );
}

function ButtonChecker() {
  return (
    <div className="absolute contents left-[993.72px] top-[553px]" data-name="Button Checker">
      <div className="absolute bg-[rgba(126,42,126,0.25)] h-[318.238px] left-[993.72px] rounded-[20px] top-[553px] w-[224.047px]" data-name="Checker">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white inset-[26.35%_7.65%_71.94%_80.42%] rounded-[10px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <p className="absolute font-['Poppins:Bold',sans-serif] h-[32.921px] leading-[normal] left-[1105.74px] not-italic text-[#3c044d] text-[24px] text-center top-[800.82px] translate-x-[-50%] w-[152.718px]">CHECKER</p>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute inset-[21.91%_8.43%_75.61%_81.14%]" data-name="Clip path group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 75">
        <g id="Clip path group">
          <mask height="75" id="mask0_4002_747" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="134" x="0" y="0">
            <g id="31007a1e86">
              <path d={svgPaths.p372e0880} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_4002_747)">
            <g id="Group">
              <path d={svgPaths.p13b5af00} fill="var(--fill-0, #FCDFFF)" id="Vector_2" />
            </g>
            <path d={svgPaths.p3f6c9cc0} fill="var(--fill-0, #FCDFFF)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Checker() {
  return (
    <div className="absolute contents left-[993.72px] top-[553px]" data-name="Checker">
      <ButtonChecker />
      <ClipPathGroup2 />
    </div>
  );
}

function ButtonHome() {
  return (
    <div className="absolute contents left-[146px] top-[553px]" data-name="button home">
      <Group8 />
      <Bar />
      <Snack />
      <Checker />
    </div>
  );
}

function Icon() {
  return (
    <div className="overflow-clip relative size-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-13.64%_-27.27%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
            <path d={svgPaths.p4c53300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="absolute contents left-[86.8%] right-[11.48%] top-[calc(50%+415px)] translate-y-[-50%]" data-name="arrow down">
      <div className="absolute aspect-[21.9999/21.9999] flex items-center justify-center left-[86.8%] right-[11.48%] top-[calc(50%+415px)] translate-y-[-50%]">
        <div className="flex-none rotate-[90deg] size-[22px]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function SeeDown() {
  return (
    <div className="absolute contents left-[1111px] top-[1906px]" data-name="see down">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[1139px] text-[14px] text-nowrap text-white top-[1907px] whitespace-pre">More Details</p>
      <ArrowDown />
    </div>
  );
}

function Container() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[96px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.953px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[102.953px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Juwita Mayasari</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.125px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[72.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#dab2ff] text-[12px] text-center w-[73px]">Kitchen</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-[102.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-center justify-center relative w-[102.953px]">
        <Container />
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#00d3f3] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Orders Completed</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[113.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[113.563px]">
        <Container2 />
        <Text />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#fb64b6] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Avarage</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[98.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[98.453px]">
        <Container4 />
        <Text1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] h-[16px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 524 13">
          <path d={svgPaths.p3e55380} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 655 13">
          <path d={svgPaths.p19ed2400} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 829 13">
          <path d={svgPaths.p398bf7f0} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 698 13">
          <path d={svgPaths.p41a00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 742 13">
          <path d={svgPaths.p9d76c00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group10 />
    </div>
  );
}

function RechartsBarR18O() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group11 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 306 13">
          <path d={svgPaths.p1a604400} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p19e0e000} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 13">
          <path d={svgPaths.pbcb1800} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 393 13">
          <path d={svgPaths.p2a4d3300} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p3036a5c0} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group12 />
      <Group13 />
      <Group14 />
      <Group17 />
      <Group21 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group22 />
    </div>
  );
}

function RechartsBarR18P() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group23 />
    </div>
  );
}

function RechartsZindex300R18S() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_4.6%_7.3%]" data-name="recharts-zindex-300-:r18s:">
      <RechartsBarR18O />
      <RechartsBarR18P />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
    </div>
  );
}

function RechartsZindex2000R() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group29 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R18S />
      <RechartsZindex2000R />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col h-[200px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow h-[224px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[224px] items-start relative w-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[282px] items-start left-[145px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[1282px] w-[1084px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[96px]" />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.953px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[102.953px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Juwita Mayasari</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.125px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[72.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#dab2ff] text-[12px] text-center w-[73px]">Kasir</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[102.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-center relative w-[102.953px]">
        <Container11 />
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#00d3f3] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Orders Completed</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[113.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[113.563px]">
        <Container13 />
        <Text2 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#fb64b6] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Avarage</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[98.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[98.453px]">
        <Container15 />
        <Text3 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[16px] h-[16px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container16 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 524 13">
          <path d={svgPaths.p3e55380} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 655 13">
          <path d={svgPaths.p19ed2400} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 829 13">
          <path d={svgPaths.p398bf7f0} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 698 13">
          <path d={svgPaths.p41a00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 742 13">
          <path d={svgPaths.p9d76c00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group30 />
      <Group31 />
      <Group32 />
      <Group33 />
      <Group34 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group35 />
    </div>
  );
}

function RechartsBarR18O1() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group36 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 306 13">
          <path d={svgPaths.p1a604400} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p19e0e000} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 13">
          <path d={svgPaths.pbcb1800} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 393 13">
          <path d={svgPaths.p2a4d3300} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p3036a5c0} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group37 />
      <Group38 />
      <Group39 />
      <Group40 />
      <Group41 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group42 />
    </div>
  );
}

function RechartsBarR18P1() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group43 />
    </div>
  );
}

function RechartsZindex300R18S1() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_4.6%_7.3%]" data-name="recharts-zindex-300-:r18s:">
      <RechartsBarR18O1 />
      <RechartsBarR18P1 />
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group44 />
      <Group45 />
      <Group46 />
      <Group47 />
      <Group48 />
    </div>
  );
}

function RechartsZindex2000R1() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group49 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R18S1 />
      <RechartsZindex2000R1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col h-[200px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[224px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[224px] items-start relative w-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[290px] items-start left-[146px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[1590px] w-[1084px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container20 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute inset-[30.5%_84.96%_67.5%_10.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.098px_-0.212px] mask-size-[58.23px_58.987px]" data-name="Group" style={{ maskImage: `url('${imgGroup3}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 61">
        <g id="Group">
          <path d={svgPaths.p3709640} fill="var(--fill-0, #B7C9FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SparkleBlue1() {
  return (
    <div className="absolute contents inset-[30.49%_84.98%_67.54%_10.47%]" data-name="SPARKLE BLUE">
      <Group50 />
    </div>
  );
}

function EmployeeStatisticHead() {
  return (
    <div className="absolute contents left-[134px] top-[916px]" data-name="EMPLOYEE STATISTIC HEAD">
      <SparkleBlue1 />
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] h-[46px] justify-center leading-[0] left-[207px] not-italic text-[32px] text-white top-[945px] translate-y-[-50%] w-[428px]">
        <p className="leading-[normal]">Employees Statistic</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[33px] size-[20px] top-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2e7662c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pbd81000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a44e700} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-purple-600 h-[50px] left-[1014px] rounded-[10px] top-[916px] w-[204.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.3)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(173,70,255,0.2),0px_4px_6px_-4px_rgba(173,70,255,0.2)]" />
      <Icon3 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[116px] text-[16px] text-center text-nowrap text-white top-[11px] translate-x-[-50%] whitespace-pre">Go to Raw Data</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[96px]" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.953px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[102.953px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Juwita Mayasari</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.125px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[72.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#dab2ff] text-[12px] text-center w-[73px]">Waiters</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-[102.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-center relative w-[102.953px]">
        <Container22 />
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#00d3f3] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Orders Completed</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[16px] relative shrink-0 w-[113.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[113.563px]">
        <Container24 />
        <Text4 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#fb64b6] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#e9d4ff] text-[12px] text-nowrap whitespace-pre">Avarage</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[16px] relative shrink-0 w-[98.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[98.453px]">
        <Container26 />
        <Text5 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[16px] h-[16px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container27 />
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute contents inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[4.4%_34.51%_89.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 524 13">
          <path d={svgPaths.p3e55380} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute contents inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[23.4%_19.96%_70.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 655 13">
          <path d={svgPaths.p19ed2400} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute contents inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[42.4%_0.56%_51.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 829 13">
          <path d={svgPaths.p398bf7f0} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute contents inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[61.4%_15.11%_32.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 698 13">
          <path d={svgPaths.p41a00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute contents inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Group">
      <div className="absolute inset-[80.4%_10.26%_13.1%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 742 13">
          <path d={svgPaths.p9d76c00} fill="var(--fill-0, #22D3EE)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group51 />
      <Group52 />
      <Group53 />
      <Group54 />
      <Group55 />
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group56 />
    </div>
  );
}

function RechartsBarR18O2() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group57 />
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute contents inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[12.9%_58.76%_80.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 306 13">
          <path d={svgPaths.p1a604400} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute contents inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[31.9%_44.21%_61.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p19e0e000} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute contents inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[50.9%_39.36%_42.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 13">
          <path d={svgPaths.pbcb1800} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group61() {
  return (
    <div className="absolute contents inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[69.9%_49.06%_23.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 393 13">
          <path d={svgPaths.p2a4d3300} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group62() {
  return (
    <div className="absolute contents inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Group">
      <div className="absolute inset-[88.9%_44.21%_4.6%_7.3%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 13">
          <path d={svgPaths.p3036a5c0} fill="var(--fill-0, #F472B6)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group63() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group58 />
      <Group59 />
      <Group60 />
      <Group61 />
      <Group62 />
    </div>
  );
}

function Group64() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group63 />
    </div>
  );
}

function RechartsBarR18P2() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group64 />
    </div>
  );
}

function RechartsZindex300R18S2() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_4.6%_7.3%]" data-name="recharts-zindex-300-:r18s:">
      <RechartsBarR18O2 />
      <RechartsBarR18P2 />
    </div>
  );
}

function Group65() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group66() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group67() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group68() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group69() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group70() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group65 />
      <Group66 />
      <Group67 />
      <Group68 />
      <Group69 />
    </div>
  );
}

function RechartsZindex2000R2() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group70 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R18S2 />
      <RechartsZindex2000R2 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col h-[200px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container30() {
  return (
    <div className="basis-0 grow h-[224px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[224px] items-start relative w-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[282.002px] items-start left-[145px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[979px] w-[1084px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container31 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[134px] top-[916px]">
      <SeeDown />
      <Container10 />
      <Container21 />
      <EmployeeStatisticHead />
      <Button />
      <Container32 />
    </div>
  );
}

function EmployeeListShortcut() {
  return (
    <div className="absolute contents left-[132px] top-[350px]" data-name="EMPLOYEE LIST SHORTCUT">
      <div className="absolute bg-purple-600 inset-[11.65%_73.44%_86.35%_10.31%] rounded-[20px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_10px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute flex flex-col font-['Poppins:Medium',sans-serif] h-[23px] justify-center leading-[0] left-[162px] not-italic text-[20px] text-white top-[379.5px] translate-y-[-50%] w-[165px]">
        <p className="leading-[normal]">Employee’s List</p>
      </div>
    </div>
  );
}

function Shortcut() {
  return (
    <div className="absolute contents left-[132px] top-[350px]" data-name="SHORTCUT">
      <EmployeeListShortcut />
    </div>
  );
}

function EmployeeListShortcut1() {
  return (
    <div className="absolute contents left-[366px] top-[350px]" data-name="EMPLOYEE LIST SHORTCUT">
      <div className="absolute bg-[rgba(126,42,126,0.46)] inset-[11.65%_55.16%_86.35%_28.59%] rounded-[20px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute flex flex-col font-['Poppins:Medium',sans-serif] h-[23px] justify-center leading-[0] left-[470px] not-italic text-[20px] text-center text-white top-[379.5px] translate-x-[-50%] translate-y-[-50%] w-[190px]">
        <p className="leading-[normal]">Employee’s Statistic</p>
      </div>
    </div>
  );
}

function Shortcut1() {
  return (
    <div className="absolute contents left-[366px] top-[350px]" data-name="SHORTCUT">
      <EmployeeListShortcut1 />
    </div>
  );
}

function EmployeeListShortcut2() {
  return (
    <div className="absolute contents left-[600px] top-[350px]" data-name="EMPLOYEE LIST SHORTCUT">
      <div className="absolute bg-[rgba(126,42,126,0.46)] inset-[11.65%_36.88%_86.35%_46.88%] rounded-[20px]">
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute flex flex-col font-['Poppins:Medium',sans-serif] h-[23px] justify-center leading-[0] left-[640px] not-italic text-[20px] text-white top-[379.5px] translate-y-[-50%] w-[146px]">
        <p className="leading-[normal]">Menu Review</p>
      </div>
    </div>
  );
}

function Shortcut2() {
  return (
    <div className="absolute contents left-[600px] top-[350px]" data-name="SHORTCUT">
      <EmployeeListShortcut2 />
    </div>
  );
}

function ShortcutList() {
  return (
    <div className="absolute contents left-[132px] top-[350px]" data-name="SHORTCUT LIST">
      <Shortcut />
      <Shortcut1 />
      <Shortcut2 />
    </div>
  );
}

function HeaderText() {
  return (
    <div className="absolute contents font-['Poppins:Medium',sans-serif] leading-[0] left-[327px] not-italic top-[94px]" data-name="HEADER TEXT">
      <div className="absolute flex flex-col h-[98px] justify-center left-[327px] text-[#fcdfff] text-[20px] top-[195px] translate-y-[-50%] w-[518px]">
        <p className="leading-[normal]">{`Welcome back! |Here's your store overview`}</p>
      </div>
      <div className="absolute flex flex-col h-[98px] justify-center left-[327px] text-[36px] text-white top-[143px] translate-y-[-50%] w-[518px]">
        <p className="leading-[normal]">Hello Admin Kedai Kiry</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[265px] left-[132px] rounded-[12px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.25)] top-[3px] w-[1091px]" data-name="Header">
      <div className="absolute bg-[#52236b] bottom-[-16.98%] left-0 right-0 top-[16.98%]" data-name="Admin Greeting" />
      <div className="absolute left-[77px] size-[176px] top-[81px]" data-name="ADMIN profile picture">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 176">
          <circle cx="88" cy="88" fill="var(--fill-0, #A587CE)" id="ADMIN profile picture" r="88" />
        </svg>
      </div>
      <HeaderText />
    </div>
  );
}

function Group71() {
  return (
    <div className="absolute bottom-[5.5%] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.787px] mask-size-[40.494px_26.005px] right-[1.86%] top-[50.49%]" data-name="Group" style={{ maskImage: `url('${imgGroup4}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 26">
        <g id="Group">
          <path d={svgPaths.p19b91700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute bottom-[5.81%] contents left-0 right-[1.23%] top-[49.12%]" data-name="Clip path group">
      <Group71 />
    </div>
  );
}

function LunarPosKiry() {
  return (
    <div className="absolute h-[57.704px] left-[18px] overflow-clip top-[324px] w-[41px]" data-name="LUNAR POS KIRY (5) 1">
      <div className="absolute inset-[6.47%_24.48%_55.94%_22.62%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path d={svgPaths.p2ca7900} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup3 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-[18px] top-[324px]">
      <LunarPosKiry />
    </div>
  );
}

function HomeButton() {
  return (
    <div className="absolute h-[36.368px] left-[1.41%] right-[95.36%] top-[calc(50%-1242.82px)] translate-y-[-50%]" data-name="Home button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 37">
        <g id="Home button">
          <g id="Home Button">
            <path d={svgPaths.p27c8b800} fill="var(--fill-0, #F9FAFB)" />
            <path d={svgPaths.p2d98ff80} fill="var(--fill-0, #F9FAFB)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Midpart() {
  return (
    <div className="absolute contents left-[18px] top-[241px]" data-name="MIDPART">
      <Group15 />
      <HomeButton />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute aspect-[16/16] left-[1.64%] overflow-clip right-[95.77%] top-[calc(50%-1359.45px)] translate-y-[-50%]" data-name="Icon">
      <div className="absolute inset-[69.42%_12.5%_12.5%_69.42%]" data-name="Vector">
        <div className="absolute inset-[-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d="M7.48705 7.48705L1.5 1.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.8%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
            <path d={svgPaths.p3fef2200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="absolute contents left-[1.64%] right-[95.77%] top-[calc(50%-1359.45px)] translate-y-[-50%]" data-name="Search">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute aspect-[16/16] left-[1.28%] overflow-clip right-[95.3%] top-[calc(50%-1447.11px)] translate-y-[-50%]" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.85%_-13.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 25">
            <path d={svgPaths.p4e61200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Retractable() {
  return (
    <div className="absolute contents left-[1.28%] right-[95.3%] top-[calc(50%-1447.11px)] translate-y-[-50%]" data-name="Retractable">
      <Icon6 />
    </div>
  );
}

function TopPart() {
  return (
    <div className="absolute contents left-0 top-[33px]" data-name="TOP PART">
      <Search />
      <Retractable />
      <div className="absolute h-0 left-0 top-[98.94px] w-[75.584px]" data-name="Divider Bottom Retractabl">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 1">
            <line id="Divider Bottom Retractabl" stroke="var(--stroke-0, #A587CE)" x2="75.5839" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-px top-[188px] w-[75.584px]" data-name="Divider Bottom Search">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 1">
            <line id="Divider Bottom Retractabl" stroke="var(--stroke-0, #A587CE)" x2="75.5839" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Navbutton() {
  return (
    <div className="absolute contents left-0 top-[33px]" data-name="NAVBUTTON">
      <Midpart />
      <TopPart />
    </div>
  );
}

function SidebarSticky() {
  return (
    <div className="absolute contents left-0 top-[-4px]" data-name="Sidebar Sticky">
      <div className="absolute bg-[rgba(60,4,77,0.46)] h-[3008px] left-0 top-[-4px] w-[76px]" data-name="Sticky Base" />
      <Navbutton />
      <div className="absolute left-[16px] size-[45px] top-[413px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Group72() {
  return (
    <div className="absolute inset-[65.69%_83.86%_32.31%_11.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.098px_-0.212px] mask-size-[58.23px_58.987px]" data-name="Group" style={{ maskImage: `url('${imgGroup5}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 61">
        <g id="Group">
          <path d={svgPaths.p15bd6600} fill="var(--fill-0, #B7C9FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SparkleBlue2() {
  return (
    <div className="absolute contents inset-[65.68%_83.89%_32.36%_11.56%]" data-name="SPARKLE BLUE">
      <Group72 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[148px] top-[1973px]">
      <SparkleBlue2 />
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] h-[46px] justify-center leading-[0] left-[221px] not-italic text-[32px] text-white top-[2002px] translate-y-[-50%] w-[428px]">
        <p className="leading-[normal]">Menu Review</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-purple-600 h-[28px] relative rounded-[10px] shrink-0 w-[68.313px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[68.313px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Today</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[101.797px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[101.797px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">This Month</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[81.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[81.203px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">Lifetime</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Group73() {
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

function Group74() {
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

function Group75() {
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

function Group76() {
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

function Group77() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group73 />
      <Group74 />
      <Group75 />
      <Group76 />
    </div>
  );
}

function Group78() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative" data-name="Group">
      <Group77 />
    </div>
  );
}

function RechartsZindex100R() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="recharts-zindex-100-:r197:">
      <Group78 />
    </div>
  );
}

function Icon7() {
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

function Container34() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[135.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[135.172px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Made Very Late</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Text6 />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[96.734px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Sent Late</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Text7 />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[126.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[126.813px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Order Early/On Time</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Text8 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container37 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[120px] items-start relative shrink-0 w-[167px]" data-name="Container">
      <Heading />
      <Container40 />
    </div>
  );
}

function OrderTotalChart() {
  return (
    <div className="absolute bg-[rgba(126,42,126,0.5)] box-border content-stretch flex flex-col gap-[24px] h-[436px] items-center left-[145px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[2054px] w-[323px]" data-name="OrderTotalChart">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container33 />
      <Icon7 />
      <Container41 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-purple-600 h-[28px] relative rounded-[10px] shrink-0 w-[68.313px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[68.313px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Today</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[101.797px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[101.797px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">This Month</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[28px] relative rounded-[10px] shrink-0 w-[81.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start px-[16px] py-[4px] relative w-[81.203px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-center text-nowrap whitespace-pre">Lifetime</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-start left-[25px] top-[25px] w-[572px]" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
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

function Group79() {
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

function Group80() {
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

function Group81() {
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

function Group82() {
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

function Group83() {
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

function Group84() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="Group">
      <Group79 />
      <Group80 />
      <Group81 />
      <Group82 />
      <Group83 />
    </div>
  );
}

function Group85() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="Group">
      <Group84 />
    </div>
  );
}

function RechartsBarR19J() {
  return (
    <div className="absolute contents inset-[34.17%_13.84%_2.5%_2.84%]" data-name="recharts-bar-:r19j:">
      <Group85 />
    </div>
  );
}

function Group86() {
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

function Group87() {
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

function Group88() {
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

function Group89() {
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

function Group90() {
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

function Group91() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="Group">
      <Group86 />
      <Group87 />
      <Group88 />
      <Group89 />
      <Group90 />
    </div>
  );
}

function Group92() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="Group">
      <Group91 />
    </div>
  );
}

function RechartsBarR19K() {
  return (
    <div className="absolute contents inset-[2.5%_8.42%_2.5%_8.26%]" data-name="recharts-bar-:r19k:">
      <Group92 />
    </div>
  );
}

function Group93() {
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

function Group94() {
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

function Group95() {
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

function Group96() {
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

function Group97() {
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

function Group98() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="Group">
      <Group93 />
      <Group94 />
      <Group95 />
      <Group96 />
      <Group97 />
    </div>
  );
}

function Group99() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="Group">
      <Group98 />
    </div>
  );
}

function RechartsBarR19L() {
  return (
    <div className="absolute contents inset-[26.25%_3%_2.5%_13.68%]" data-name="recharts-bar-:r19l:">
      <Group99 />
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

function Icon8() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <RechartsZindex300R19O />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[200px] items-start left-[25px] top-[121px] w-[572px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#ff8904] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[124.125px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Makanan</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Text9 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#fdc700] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[101.922px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Minuman</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Text10 />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#00d5be] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[78.859px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#e9d4ff] text-[14px] text-nowrap whitespace-pre">Snack</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Text11 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[76px] items-start left-[25px] top-[337px] w-[572px]" data-name="Container">
      <Container45 />
      <Container47 />
      <Container49 />
    </div>
  );
}

function Group100() {
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
    <div className="absolute bg-[rgba(126,42,126,0.5)] h-[438px] left-[506px] rounded-[16px] top-[2054px] w-[723px]" data-name="BestSellingChart">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container42 />
      <Heading1 />
      <Container43 />
      <Container50 />
      <Group100 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents left-[145px] top-[2054px]">
      <OrderTotalChart />
      <BestSellingChart />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[145px] top-[1973px]">
      <Group16 />
      <Group19 />
    </div>
  );
}

function Group101() {
  return (
    <div className="absolute inset-[76.8%_6.88%_21.09%_91.02%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 64">
        <g id="Group">
          <path d={svgPaths.p3248b800} fill="var(--fill-0, #2DD4BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function AdminHomePage() {
  return (
    <div className="relative size-full" data-name="Admin Home page">
      <div className="absolute bg-[#4f2775] h-[3090px] left-[-6px] top-0 w-[1280px]" />
      <PickSection />
      <ButtonHome />
      <Group18 />
      {[...Array(2).keys()].map((_, i) => (
        <ShortcutList key={i} />
      ))}
      <Header />
      <SidebarSticky />
      <Group20 />
      <Group101 />
    </div>
  );
}