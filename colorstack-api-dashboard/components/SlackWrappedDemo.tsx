"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SlackWrappedDemo: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="ColorStack" />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/slack-wrapped-demo" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Slack Wrapped
                </Link>
                <Link href="/study-buddy-demo" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Study Buddy
                </Link>
                <Link href="/api-docs" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  API Docs
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleSignOut}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h1 className="text-2xl font-semibold mb-4">Slack Wrapped Demo</h1>
            <p className="mt-2 text-gray-600">This is a demonstration of what you can build with the Slack Wrapped API endpoint.</p>
            <div className="mt-6">
              <h2 className="text-lg font-medium">Example statistics:</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Total messages sent</li>
                <li>Most active channels</li>
                <li>Most used emojis</li>
                <li>Activity by time of day</li>
              </ul>
            </div>
            <div className="mt-8">
              <p className="font-bold">Want to implement this in your app?</p>
              <a href="/api-docs" className="text-indigo-600 hover:text-indigo-700 mt-1 inline-block">
                Check out our API documentation &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackWrappedDemo;
