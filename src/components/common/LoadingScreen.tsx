import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsHidden(true);
              if (onLoaded) onLoaded();
            }, 700);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070b] text-white transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Rotating Logo / Loader Ring */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 border-r-amber-500 animate-spin shadow-[0_0_30px_rgba(245,158,11,0.4)]" />
        {/* Inner Counter Ring */}
        <div className="absolute inset-3 rounded-full border-2 border-orange-500/30 border-b-amber-300 animate-[spin_2s_linear_infinite_reverse]" />
        
        {/* Center Emblem */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl animate-bounce">🧀</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mt-1">3D WORLD</span>
        </div>
      </div>

      {/* Progress & Brand Tagline */}
      <div className="mt-8 text-center space-y-3">
        <h2 className="text-2xl font-black uppercase tracking-wider text-white">
          CHEESE BITES <span className="text-amber-400">3D</span>
        </h2>
        <p className="text-xs font-medium text-slate-400 tracking-widest uppercase">
          Crafting Cinematic Experience... {progress}%
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800 mx-auto">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 transition-all duration-300 ease-out rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
