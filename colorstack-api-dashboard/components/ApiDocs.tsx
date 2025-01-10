"use client";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ApiDocs: React.FC = () => {
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
                <Link href="/slack-wrapped-demo" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Slack Wrapped
                </Link>
                <Link href="/study-buddy-demo" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Study Buddy
                </Link>
                <Link href="/api-docs" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">API Documentation</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              <p className="text-gray-600">To use the ColorStack API, you'll need to authenticate using your API key. You can find your API key in the Dashboard.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility</h2>
              <p className="text-gray-600">To be eligible for API access, you must meet the following criteria:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                <li>Enrolled in ColorStack within the last 8 weeks</li>
                <li>Demonstrated recurring activity for at least 4 weeks</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication</h2>
              <p className="text-gray-600">Include your API key in the Authorization header of all requests:</p>
              <pre className="bg-gray-100 p-4 rounded mt-2">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
              <p className="text-gray-600 mt-2">Your API key is linked to your unique ColorStack-ID. Do not share your API key or use duplicate keys, as this may result in account suspension.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>
              
              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Dashboard</h3>
                <p className="text-gray-600 mb-2">GET /dashboard</p>
                <p className="text-gray-600">Retrieve user information and API usage statistics.</p>
                <p className="text-gray-600 mt-2">Response includes:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                  <li>Total API requests made</li>
                  <li>Timestamp of the last API request</li>
                  <li>User activation status</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Slack Wrapped</h3>
                <p className="text-gray-600 mb-2">GET /slack-wrapped</p>
                <p className="text-gray-600">Retrieve Slack usage statistics for the authenticated user.</p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Study Buddy</h3>
                <p className="text-gray-600 mb-2">GET /study-buddy/matches</p>
                <p className="text-gray-600">Find potential study partners based on shared courses.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Measures</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                <li>API access is monitored using data analytics tools to detect potential abuse</li>
                <li>IP address limitations may be implemented to prevent abuse from multiple locations</li>
                <li>Violating the terms of use may result in API access suspension</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support</h2>
              <p className="text-gray-600">If you encounter any issues or have questions about the API, please contact our support team at api-support@colorstack.com.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
