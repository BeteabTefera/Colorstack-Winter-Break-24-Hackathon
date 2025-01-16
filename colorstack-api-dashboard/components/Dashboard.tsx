import React, { useCallback, useEffect, useState } from 'react';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { HeartHandshake } from 'lucide-react';
import Nav from '../components/Nav';

type Student = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  activated_at: boolean;
  profile_picture: string | null;
};

type ApiUsage = {
  total_requests: number;
  last_request_at: string;
};
// Define a default image URL to fallback to
const DEFAULT_PROFILE_PICTURE = 'https://ca.slack-edge.com/T011H0EFBHC-U03PGD40GP3-g79e0394a01f-512';

const Dashboard: React.FC = () => {
  const { user, supabase, signOut } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [apiUsage, setApiUsage] = useState<ApiUsage | null>(null);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const router = useRouter();

  const fetchCurrentUser = useCallback(async () => {
    if (user?.email) {
      const { data, error } = await supabase
        .from('students')
        .select('id, email, first_name, last_name, activated_at, profile_picture')
        .eq('email', user.email)
        .single();
      if (error) console.error('Error fetching current user:', error);
      else setCurrentUser(data);
    }
  }, [user?.email, supabase]);

  const fetchStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from('students')
      .select('id, email, first_name, last_name, activated_at, profile_picture');
    if (error) console.error('Error fetching students:', error);
    else setStudents(data || []);
  }, [supabase]);

  const fetchApiUsage = useCallback(async () => {
    const { data, error } = await supabase
      .from('api_usage')
      .select('email, total_requests, last_request_at')
      .eq('email', user?.email)
      .single();
    if (error) console.error('Error fetching API usage:', error);
    else setApiUsage(data);
  }, [user?.email, supabase]);

  useEffect(() => {
    if (user) {
      fetchStudents();
      fetchApiUsage();
      fetchCurrentUser();
    }
  }, [user, fetchStudents, fetchApiUsage, fetchCurrentUser]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students.filter((student) => {
    const nameMatch = (student.first_name + ' ' + student.last_name).toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === 'all' || (filterStatus === 'activated' && student.activated_at) || (filterStatus === 'not-activated' && !student.activated_at);
    return nameMatch && statusMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 to-sage-600">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:spacx-e-8">
                <Nav />
              </div>
            </div>
            <div className="md:ml-6 md:flex md:items-center">
              <button
                onClick={handleSignOut}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {currentUser && (
              <div className="flex items-center mb-6">
                <img
                  src={currentUser.profile_picture === '0' ? DEFAULT_PROFILE_PICTURE : currentUser.profile_picture || DEFAULT_PROFILE_PICTURE}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-teal-600"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Status:{' '}
                    <span
                      className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        currentUser.activated_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {currentUser.activated_at ? 'Activated' : 'Not Activated'}
                    </span>
                  </p>
                </div>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              {currentUser?.first_name}, Welcome to Your Dashboard <HeartHandshake className="ml-2 text-teal-600" />
            </h1>

            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">API Usage</h2>
              {apiUsage ? (
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-base sm:text-lg">Total API Requests: <span className="font-semibold">{apiUsage.total_requests}</span></p>
                  <p className="text-base sm:text-lg">Last Request At: <span className="font-semibold">{new Date(apiUsage.last_request_at).toLocaleString()}</span></p>
                </div>
              ) : (
                <p className="text-gray-600">Loading API usage data...</p>
              )}
            </div>

            <div>
              <h2 className="pb-2 text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Members</h2>
              <div className="overflow-x-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 pb-6">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500"
                  >
                    <option value="all">All</option>
                    <option value="activated">Activated</option>
                    <option value="not-activated">Not Activated</option>
                  </select>
                </div>

                {/* Scrollable Students List */}
                <ScrollMenu>
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex-none p-2 w-48 bg-gray-100 rounded-lg mr-4">
                      <img
                        src={student.profile_picture === '0' ? DEFAULT_PROFILE_PICTURE : student.profile_picture || DEFAULT_PROFILE_PICTURE}
                        alt={`${student.first_name} ${student.last_name}`}
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                      <div className="text-center mt-2">
                        <div className="text-sm font-medium text-gray-900">
                          {student.first_name} {student.last_name}
                        </div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.activated_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {student.activated_at ? 'Activated' : 'Not Activated'}
                        </span>
                      </div>
                    </div>
                  ))}
                </ScrollMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
