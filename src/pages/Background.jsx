import React from 'react';

const CryptoBackground = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-auto"> 
      
      {/* Background container */}
      <div className="absolute inset-0 z-0">
        {/* Deep Black-Red Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080001] via-[#0D0003] to-[#020000]" />

        {/* Dark Red Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#450A0A_0%,_#2D0606_30%,_transparent_70%)] opacity-40" />

        {/* Full-screen Red Noise Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwRDAwMDMiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsLW9wYWNpdHk9IjAuMjUiIGZpbGw9InVybCgjbmlzZSkiLz48ZGVmcz48ZmlsdGVyIGlkPSJuaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==')] opacity-25 mix-blend-overlay" />

        {/* Deep Crimson Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,_rgba(101,11,23,0.25)_0%,_transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default CryptoBackground;
