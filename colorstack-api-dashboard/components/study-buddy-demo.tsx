"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Nav from './Nav';
import { Users, Calendar, BookOpen, TrendingUp, Code } from 'lucide-react';
import Link from 'next/link';

const StudyBuddyDemo: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Showcase: Study Buddy API Capabilities</h1>
            <p className="text-xl text-gray-600 mb-8">Here is what you can build using our Study Buddy API endpoint!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Users className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Partner Matching</h2>
                </div>
                <p className="text-sm text-gray-500 mt-2">Find study partners based on shared courses and interests</p>
              </div>

              <div className="bg-sage-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Calendar className="text-sage-600 mr-2" />
                  <h2 className="text-xl font-semibold">Session Scheduling</h2>
                </div>
                <p className="text-sm text-gray-500 mt-2">Coordinate and schedule study sessions with matched partners</p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Resource Sharing</h2>
                </div>
                <p className="text-sm text-gray-500 mt-2">Share and collaborate on study materials and notes</p>
              </div>

              <div className="bg-sage-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <TrendingUp className="text-sage-600 mr-2" />
                  <h2 className="text-xl font-semibold">Progress Tracking</h2>
                </div>
                <p className="text-sm text-gray-500 mt-2">Monitor and analyze study progress with partners</p>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Code className="text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">API Features</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>User profile management and preferences</li>
                <li>Course and subject tagging system</li>
                <li>Matching algorithm based on multiple criteria</li>
                <li>Secure messaging and file sharing capabilities</li>
              </ul>
            </div>

            <div className="mt-12 text-center">
              <p className="font-bold text-xl mb-4">Ready to integrate Study Buddy features?</p>
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

export default StudyBuddyDemo;
