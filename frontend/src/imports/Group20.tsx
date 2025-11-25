import svgPaths from "./svg-orp3i05os9";
import { imgGroup } from "./svg-2ugso";

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
    <div className="absolute contents left-[89.14%] right-[8.85%] top-[calc(50%+495px)] translate-y-[-50%]" data-name="arrow down">
      <div className="absolute aspect-[21.9999/21.9999] flex items-center justify-center left-[89.14%] right-[8.85%] top-[calc(50%+495px)] translate-y-[-50%]">
        <div className="flex-none rotate-[90deg] size-[22px]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function SeeDown() {
  return (
    <div className="absolute contents left-[977px] top-[990px]" data-name="see down">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[1005px] text-[14px] text-nowrap text-white top-[991px] whitespace-pre">More Details</p>
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

function Group() {
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

function Group1() {
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

function Group2() {
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

function Group3() {
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

function Group4() {
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

function Group5() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group5 />
    </div>
  );
}

function RechartsBarR18O() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group6 />
    </div>
  );
}

function Group7() {
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

function Group8() {
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

function Group9() {
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

function Group10() {
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

function Group11() {
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

function Group12() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
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
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function RechartsBarR18P() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group13 />
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

function Group14() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
      <Group18 />
    </div>
  );
}

function RechartsZindex2000R() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group19 />
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
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[282px] items-start left-[11px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[366px] w-[1084px]" data-name="Container">
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

function Group21() {
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

function Group22() {
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

function Group23() {
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

function Group24() {
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

function Group25() {
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

function Group26() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group21 />
      <Group22 />
      <Group23 />
      <Group24 />
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group26 />
    </div>
  );
}

function RechartsBarR18O1() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group27 />
    </div>
  );
}

function Group28() {
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

function Group29() {
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

function Group30() {
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

function Group31() {
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

function Group32() {
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

function Group33() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group28 />
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group33 />
    </div>
  );
}

function RechartsBarR18P1() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group34 />
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

function Group35() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group35 />
      <Group36 />
      <Group37 />
      <Group38 />
      <Group39 />
    </div>
  );
}

function RechartsZindex2000R1() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group40 />
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
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[290px] items-start left-[12px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[674px] w-[1084px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container20 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute inset-[0.02%_94.66%_94.04%_-0.1%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.098px_-0.212px] mask-size-[58.23px_58.987px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 61">
        <g id="Group">
          <path d={svgPaths.p3709640} fill="var(--fill-0, #B7C9FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SparkleBlue() {
  return (
    <div className="absolute bottom-[94.17%] contents left-0 right-[94.69%] top-0" data-name="SPARKLE BLUE">
      <Group41 />
    </div>
  );
}

function EmployeeStatisticHead() {
  return (
    <div className="absolute contents left-0 top-0" data-name="EMPLOYEE STATISTIC HEAD">
      <SparkleBlue />
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] h-[46px] justify-center leading-[0] left-[73px] not-italic text-[32px] text-white top-[29px] translate-y-[-50%] w-[428px]">
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
    <div className="absolute bg-purple-600 h-[50px] left-[880px] rounded-[10px] top-0 w-[204.5px]" data-name="Button">
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

function Group42() {
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

function Group43() {
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

function Group44() {
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

function Group45() {
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

function Group46() {
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

function Group47() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group42 />
      <Group43 />
      <Group44 />
      <Group45 />
      <Group46 />
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="Group">
      <Group47 />
    </div>
  );
}

function RechartsBarR18O2() {
  return (
    <div className="absolute contents inset-[4.4%_0.56%_13.1%_7.3%]" data-name="recharts-bar-:r18o:">
      <Group48 />
    </div>
  );
}

function Group49() {
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

function Group50() {
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

function Group51() {
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

function Group52() {
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

function Group53() {
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

function Group54() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group49 />
      <Group50 />
      <Group51 />
      <Group52 />
      <Group53 />
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="Group">
      <Group54 />
    </div>
  );
}

function RechartsBarR18P2() {
  return (
    <div className="absolute contents inset-[12.9%_39.36%_4.6%_7.3%]" data-name="recharts-bar-:r18p:">
      <Group55 />
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

function Group56() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_84.37%_2.92%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.13%_93.6%_84.37%_2.92%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 1</p>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute contents inset-[27.13%_93.6%_65.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[27.13%_93.6%_65.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 2</p>
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute contents inset-[46.13%_93.6%_46.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[46.13%_93.6%_46.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 3</p>
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute contents inset-[65.13%_93.6%_27.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.13%_93.6%_27.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 4</p>
    </div>
  );
}

function Group60() {
  return (
    <div className="absolute contents inset-[84.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[84.13%_93.6%_8.37%_2.69%] leading-[normal] not-italic text-[12px] text-purple-200 text-right">Day 5</p>
    </div>
  );
}

function Group61() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="Group">
      <Group56 />
      <Group57 />
      <Group58 />
      <Group59 />
      <Group60 />
    </div>
  );
}

function RechartsZindex2000R2() {
  return (
    <div className="absolute contents inset-[8.13%_93.6%_8.37%_2.69%]" data-name="recharts-zindex-2000-:r193:">
      <Group61 />
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
    <div className="absolute bg-[rgba(126,42,126,0.25)] box-border content-stretch flex flex-col h-[282.002px] items-start left-[11px] pb-px pt-[25px] px-[25px] rounded-[16px] top-[63px] w-[1084px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container31 />
    </div>
  );
}

export default function Group20() {
  return (
    <div className="relative size-full">
      <SeeDown />
      <Container10 />
      <Container21 />
      <EmployeeStatisticHead />
      <Button />
      <Container32 />
    </div>
  );
}