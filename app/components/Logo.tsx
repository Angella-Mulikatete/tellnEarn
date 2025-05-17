
import Image from 'next/image';
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image 
        src=""
        alt="TellnEarn Logo"
        className="h-10 w-auto"
        height={100}
        width={100}
      />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-yellow">TellnEarn</span>
        <span className="text-xs text-yellow/80">Your Opinion Pays.</span>
      </div>
    </div>
  );
};

export default Logo;
