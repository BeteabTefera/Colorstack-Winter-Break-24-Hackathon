"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Student = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  activated_at: string | null;
};

type ApiUsage = {
  email: string;
  total_requests: number;
  last_request_at: string;
};

const Dashboard: React.FC = () => {
  const { user, loading, supabase, signOut } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [apiUsage, setApiUsage] = useState<ApiUsage | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/');
    } else {
      fetchStudents();
      fetchApiUsage();
    }
  }, [user, loading, router]);

  const fetchStudents = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('students')
      .select('id, email, first_name, last_name, activated_at');
    console.log('Students Data:', data);
    if (error) console.error('Error fetching students:', error);
    else setStudents(data || []);
  };

  const fetchApiUsage = async () => {
    if (!supabase || !user) return;
    const { data, error } = await supabase
      .from('api_usage')
      .select('email, total_requests, last_request_at')
      .eq('email', user.email)
      .single();
    console.log('API Usage:', data);
    if (error) console.error('Error fetching API usage:', error);
    else setApiUsage(data);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600">
      <nav className="bg-white shadow-sm">
        {/* Navigation content */}
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.activated_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {student.activated_at ? 'Activated' : 'Not Activated'}
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
