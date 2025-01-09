"use client"
import React from 'react';

const SlackWrappedDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Slack Wrapped Demo</h1>
              <p className="mt-2 text-gray-600">This is a demonstration of what you can build with the Slack Wrapped API endpoint.</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Here are some example statistics you could display:</p>
                <ul className="list-disc space-y-2">
                  <li>Total messages sent</li>
                  <li>Most active channels</li>
                  <li>Most used emojis</li>
                  <li>Activity by time of day</li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Want to implement this in your app?</p>
                <p>
                  <a href="/api-docs" className="text-cyan-600 hover:text-cyan-700"> Check out our API documentation &rarr; </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackWrappedDemo;

