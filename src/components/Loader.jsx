import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0fff41a]">
      {/* Container with responsive sizing */}
      <div className="relative w-[15vw] h-[15vw] max-w-24 max-h-24 sm:w-20 sm:h-20 md:w-24 md:h-24">
        {/* Primary Neon Ring - Reduced border width */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full 
                        border-t-[#5EEAD4] border-r-[#2DD4BF] animate-aura-spin
                        [border-top-width:2px] [border-right-width:2px]">
          <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(94,234,212,0.3)]" />
        </div>
        
        {/* Secondary Cyan Ring - Tighter animation */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full 
                        border-b-[#00FFCC] border-l-[#22D3EE] animate-aura-spin-reverse
                        [border-bottom-width:1.5px] [border-left-width:1.5px]">
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]" />
        </div>

        {/* Tertiary Ring - Smoother transition */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full 
                        border-t-[#86EFAC] border-r-[#4ADE80] animate-aura-spin-delayed
                        [border-top-width:1px] [border-right-width:1px]">
          <div className="absolute inset-0 rounded-full shadow-[0_0_8px_rgba(134,239,172,0.2)]" />
        </div>

      </div>
    </div>
  );
};

export default Loader;