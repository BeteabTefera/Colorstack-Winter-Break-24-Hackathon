"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Student = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  activated: boolean;
};

type ApiUsage = {
  total_requests: number;
  last_request_at: string;
};

const Dashboard: React.FC = () => {
  const { user, loading, supabase, signOut } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [apiUsage, setApiUsage] = useState<ApiUsage | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Don't do anything while loading
  
    if (!user) {
      router.push('/');
    } else {
      fetchStudents();
      fetchApiUsage();
    }
  }, [user, loading, router]);
  
  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('id, email, first_name, last_name, activated');
    if (error) console.error('Error fetching students:', error);
    else setStudents(data || []);
  };

  const fetchApiUsage = async () => {
    const { data, error } = await supabase
      .from('api_usage')
      .select('total_requests, last_request_at')
      .eq('email', user?.email)
      .single();
    if (error) console.error('Error fetching API usage:', error);
    else setApiUsage(data);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) return null;

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
                <Link
                  href="/dashboard"
                  className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/slack-wrapped-demo"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Slack Wrapped Demo
                </Link>
                <Link
                  href="/study-buddy-demo"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Study Buddy Demo
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h1>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Usage</h2>
              {apiUsage ? (
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-lg">Total Requests: <span className="font-semibold">{apiUsage.total_requests}</span></p>
                  <p className="text-lg">Last Request: <span className="font-semibold">{new Date(apiUsage.last_request_at).toLocaleString()}</span></p>
                </div>
              ) : (
                <p className="text-gray-600">Loading API usage data...</p>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Students</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.activated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {student.activated ? 'Activated' : 'Not Activated'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
