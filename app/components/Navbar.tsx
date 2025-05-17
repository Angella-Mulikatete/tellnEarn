'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, FileText, Grid2X2, Search, Share, Users } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import WalletConnect from './WalletConnect';
import { Button } from "../components/ui/button";

const Navbar = ({ username }: { username?: string }) => {
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Grid2X2 size={20} />, path: '/' },
    { id: 'campaigns', label: 'Campaigns', icon: <FileText size={20} />, path: '/campaigns' },
    { id: 'explore', label: 'Explore', icon: <Search size={20} />, path: '/explore' },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award size={20} />, path: '/leaderboard' },
    { id: 'social', label: 'Social', icon: <Share size={20} />, path: '/social' },
    { id: 'profile', label: 'Profile', icon: <Users size={20} />, path: '/profile' },
  ];

  return (
    <div className="fixed w-full z-10 top-0 left-0 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-lg border-b border-border/50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                  pathname === item.path
                    ? "text-tellnearn-yellow bg-tellnearn-yellow/10"
                    : "text-foreground/70 hover:text-tellnearn-yellow hover:bg-tellnearn-yellow/5"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {username && (
          <div className="flex items-center gap-4">
            <span className="text-tellnearn-yellow">@{username}</span>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>
        )}

          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;






// import React, { useState } from 'react';
// import Link  from 'next/link';
// import { Award, FileText, Grid2X2, Search, Share, Users } from 'lucide-react';
// import Logo from './Logo';
// import { cn } from '@/lib/utils';
// //import { Button } from '../components/ui/button';
// import WalletConnect from './WalletConnect';

// const Navbar: React.FC = () => {
//   const [activeItem, setActiveItem] = useState('dashboard');

//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <Grid2X2 size={20} />, path: '/' },
//     { id: 'campaigns', label: 'Campaigns', icon: <FileText size={20} />, path: '/campaigns' },
//     { id: 'explore', label: 'Explore', icon: <Search size={20} />, path: '/explore' },
//     { id: 'leaderboard', label: 'Leaderboard', icon: <Award size={20} />, path: '/leaderboard' },
//     { id: 'social', label: 'Social', icon: <Share size={20} />, path: '/social' },
//     { id: 'profile', label: 'Profile', icon: <Users size={20} />, path: '/profile' },
//   ];

//   return (
//     <div className="fixed w-full z-10 top-0 left-0 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-lg border-b border-border/50">
//       <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
//         <div className="flex h-16 items-center justify-between">
//           <Logo />
          
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <Link 
//                 key={item.id}
//                 href={item.path}
//                 className={cn(
//                   "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
//                   activeItem === item.id
//                     ? "text-tellnearn-yellow bg-tellnearn-yellow/10"
//                     : "text-foreground/70 hover:text-tellnearn-yellow hover:bg-tellnearn-yellow/5"
//                 )}
//                 onClick={() => setActiveItem(item.id)}
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </div>

//           <div className="flex items-center gap-4">
//             <WalletConnect/> 
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
