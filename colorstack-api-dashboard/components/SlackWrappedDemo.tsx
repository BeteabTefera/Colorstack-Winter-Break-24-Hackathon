'use client' 
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Nav from './Nav';
import { BarChart, MessageSquare, Smile, Clock } from 'lucide-react';
import Link from 'next/link';

const SlackWrappedDemo: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 to-sage-600">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Nav />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleSignOut}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Slack Wrapped Demo</h1>
            <p className="text-xl text-gray-600 mb-8">Here is an application you can make with our API! SLACK WRAPPED</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <MessageSquare className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Total Messages</h2>
                </div>
                <p className="text-4xl font-bold text-teal-600">1,234</p>
                <p className="text-sm text-gray-500 mt-2">Messages sent this year</p>
              </div>

              <div className="bg-sage-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <BarChart className="text-sage-600 mr-2" />
                  <h2 className="text-xl font-semibold">Top Channels</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>#general</span>
                    <span className="font-semibold">456 messages</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>#random</span>
                    <span className="font-semibold">321 messages</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>#project-x</span>
                    <span className="font-semibold">234 messages</span>
                  </li>
                </ul>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Smile className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Top Emojis</h2>
                </div>
                <div className="flex justify-around text-2xl">
                  <span>👍 (50)</span>
                  <span>😄 (45)</span>
                  <span>🎉 (30)</span>
                </div>
              </div>

              <div className="bg-sage-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Clock className="text-sage-600 mr-2" />
                  <h2 className="text-xl font-semibold">Peak Activity</h2>
                </div>
                <p className="text-lg">Most active between <span className="font-semibold">2 PM - 4 PM</span></p>
                <p className="text-sm text-gray-500 mt-2">Based on your message timestamps</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="font-bold text-xl mb-4">Want to implement Slack Wrapped in your app?</p>
              <Link href="/api-docs" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Explore our API documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackWrappedDemo;
