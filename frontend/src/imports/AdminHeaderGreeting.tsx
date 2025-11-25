function HeaderText() {
  return (
    <div className="absolute contents font-['Poppins:Medium',sans-serif] leading-[0] left-[327px] not-italic top-[49px]" data-name="HEADER TEXT">
      <div className="absolute flex flex-col h-[98px] justify-center left-[327px] text-[#fcdfff] text-[20px] top-[150px] translate-y-[-50%] w-[518px]">
        <p className="leading-[normal]">{`Welcome back! |Here's your store overview`}</p>
      </div>
      <div className="absolute flex flex-col h-[98px] justify-center left-[327px] text-[36px] text-white top-[98px] translate-y-[-50%] w-[518px]">
        <p className="leading-[normal]">Hello Admin Kedai Kiry</p>
      </div>
    </div>
  );
}

export default function AdminHeaderGreeting() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#52236b] inset-0" data-name="Admin Greeting" />
      <div className="absolute left-[77px] top-1/2 -translate-y-1/2 size-[141px]" data-name="ADMIN profile picture">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 176">
          <circle cx="88" cy="88" fill="var(--fill-0, #A587CE)" id="ADMIN profile picture" r="88" />
        </svg>
      </div>
      <HeaderText />
    </div>
  );
}