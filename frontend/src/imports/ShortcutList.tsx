import { useNavigate } from 'react-router-dom';

function EmployeeListShortcut() {
  const navigate = useNavigate();
  return (
    <div className="relative" data-name="EMPLOYEE LIST SHORTCUT">
    </div>
  );
}

function Shortcut() {
  return (
    <div data-name="SHORTCUT">
      <EmployeeListShortcut />
    </div>
  );
}

function EmployeeListShortcut1() {
  const navigate = useNavigate();
  
  const scrollToCookingEfficiency = () => {
    const element = document.querySelector('[data-name="cooking-efficiency-section"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="relative" data-name="EMPLOYEE LIST SHORTCUT">
      <div className="bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 hover:-translate-y-1 rounded-[20px] px-6 py-4 h-[70px] flex items-center justify-center transition-all cursor-pointer" onClick={scrollToCookingEfficiency}>
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px] hover:shadow-[0px_10px_4px_0px_rgba(0,0,0,0.25)]" />
        <p className="font-['Poppins:Medium',sans-serif] text-[20px] text-white text-center leading-[normal] relative z-10">Employees Cooking Efficiency</p>
      </div>
    </div>
  );
}

function Shortcut1() {
  return (
    <div data-name="SHORTCUT">
      <EmployeeListShortcut1 />
    </div>
  );
}

function EmployeeListShortcut2() {
  const navigate = useNavigate();
  
  const scrollToMenuReview = () => {
    const element = document.querySelector('[data-name="menu-review-section"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <div className="relative" data-name="EMPLOYEE LIST SHORTCUT">
      <div className="bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 hover:-translate-y-1 rounded-[20px] px-6 py-4 h-[70px] flex items-center justify-center transition-all cursor-pointer" onClick={scrollToMenuReview}>
        <div aria-hidden="true" className="absolute border border-[rgba(251,100,182,0.2)] border-solid inset-0 pointer-events-none rounded-[20px] hover:shadow-[0px_10px_4px_0px_rgba(0,0,0,0.25)]" />
        <p className="font-['Poppins:Medium',sans-serif] text-[20px] text-white leading-[normal] relative z-10">Menu Review</p>
      </div>
    </div>
  );
}

function Shortcut2() {
  return (
    <div data-name="SHORTCUT">
      <EmployeeListShortcut2 />
    </div>
  );
}

export default function ShortcutList() {
  return (
    <div className="flex gap-4 w-fit" data-name="SHORTCUT LIST">
      <Shortcut />
      <Shortcut1 />
      <Shortcut2 />
    </div>
  );
}