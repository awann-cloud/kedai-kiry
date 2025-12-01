function Group() {
  return (
    <div className="absolute contents font-['Poppins:Regular',sans-serif] leading-[normal] left-[253px] not-italic text-[#6f839a] text-right top-[63px]">
      <p className="absolute h-[15px] left-[352.85px] text-[8px] top-[78px] translate-x-[-100%] w-[99.848px]">STARTED IN: XX:XX</p>
      <p className="absolute h-[15px] left-[353.85px] text-[10px] top-[63px] translate-x-[-100%] w-[99.848px]">NAMA STAFF MASAK</p>
      <p className="absolute h-[15px] left-[352.85px] text-[8px] top-[91px] translate-x-[-100%] w-[99.848px]">FINISHED IN: XX:XX</p>
    </div>
  );
}

export default function MenuItemsFinished() {
  return (
    <div className="relative size-full" data-name="MENU ITEMS FINISHED">
      <div className="absolute bg-gray-50 inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="ON THEIR WAY" />
      <Group />
      <p className="absolute font-['Poppins:Regular','Noto_Sans:Regular',sans-serif] h-[15px] leading-[normal] left-[27px] text-[#6f839a] text-[10px] top-[91px] w-[136px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ✓ DELIVERED BY: XXXXX
      </p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic right-[12.26px] text-[#00783e] text-[28px] text-right top-[25px] w-[98.739px]">00:00</p>
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[normal] left-[27px] not-italic text-[20px] text-black top-[26px] w-[166px] whitespace-pre-wrap">{`NAMA ITEM  `}</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[16px] leading-[normal] left-[27px] not-italic text-[16px] text-black top-[57px] w-[166px]">NOTES</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[20px] leading-[normal] left-[149px] not-italic text-[20px] text-black top-[26px] w-[44px]">2X</p>
    </div>
  );
}