"use client"
import React from 'react';

const StudyBuddyDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Study Buddy Demo</h1>
              <p className="mt-2 text-gray-600">This is a demonstration of what you can build with the Study Buddy API endpoint.</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Here are some features you could implement:</p>
                <ul className="list-disc space-y-2">
                  <li>Find study partners based on shared courses</li>
                  <li>Schedule study sessions</li>
                  <li>Share and collaborate on study materials</li>
                  <li>Track study progress together</li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Ready to add study buddy features to your app?</p>
                <p>
                  <a href="/api-docs" className="text-cyan-600 hover:text-cyan-700"> Explore our API documentation &rarr; </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddyDemo;

