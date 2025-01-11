'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Nav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:ml-6 md:flex md:space-x-8">
      <div className="flex-shrink-0 flex items-center">
        <img className="h-8 w-auto" src="./assets/logo.png" alt="ColorStack" />
      </div>
      <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
        Dashboard
      </Link>
      <Link href="/slack-wrapped-demo" className={`${pathname === '/slack-wrapped-demo' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
        Slack Wrapped
      </Link>
      <Link href="/study-buddy-demo" className={`${pathname === '/study-buddy-demo' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
        Study Buddy
      </Link>
      <Link href="/api-docs" className={`${pathname === '/api-docs' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
        API Docs
      </Link>
    </div>
  );
};

export default Nav;
