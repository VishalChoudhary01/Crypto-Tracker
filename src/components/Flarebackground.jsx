export default function FlareSection() {
    return (
      <div className="relative h-screen w-full bg-gray-900 overflow-hidden">
        {/* Central Flare with Gradient Stops */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" absolute size-[600px] shadow-[0_60px_60px_rgba(0,0,0,0.5)]  bg-radial animate-flare-pulse from-red-400/80 from-20% via-transparent via-60% to-transparent to-90% rounded-full" />
          <div className=" absolute size-[800px] shadow-[0_60px_60px_rgba(0,0,0,0.5)]  bg-radial animate-flare-pulse from-red-400/80 from-20% via-transparent via-60% to-transparent to-90% rounded-full" />
        </div>
  
  
        {/* Content Overlay */}
        <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto">
          
        </div>
      </div>
    );
  }