"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

console.log(apiUrl)
if (!supabaseUrl || !supabaseKey || !apiUrl) {
  throw new Error("Missing environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface Student {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  // Add other properties as needed based on your API response
}
interface AuthContextType {
  user: User | null;
  supabase: any; // You might want to use a more specific type from @supabase/supabase-js
  checkAndActivateUser: (email: string) => Promise<boolean>;
  signIn: (email: string) => Promise<void>;
  fetchStudentData: (email: string) => Promise<Student>;
  studentData: Student | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        window.location.href = '/dashboard';
      }
    });
  
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user || null);
  //   });

  //   return () => subscription.subscription.unsubscribe();
  // }, []);

  const checkAndActivateUser = async (email:string) => {
    // Check if email is in students table
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('email')
      .eq('email', email)
      .single();

    if (studentError) {
      throw new Error('Student not found in Colorstack database');
    }

    if (!studentData) {
      throw new Error('Student not found in Colorstack database');
    }

    // Check if email is already in api_activated table
    const { data: activatedData, error: activatedError } = await supabase
      .from('api_activated')
      .select('email')
      .eq('email', email)
      .single();

    if (activatedError && activatedError.code !== 'PGRST116') {
      throw new Error('Student not found in Colorstack database');
    }

    if (activatedData) {
      throw new Error('Email already activated');
    }

    // If not activated, insert into api_activated table
    const { error: insertError } = await supabase
      .from('api_activated')
      .insert({ email });

    if (insertError) {
      throw new Error('Error activating account');
    }

    return true;
  };

  const signIn = async (email: string, redirectTo?: string) => {
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: redirectTo || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
      }
    });
    if (error) throw error;
  };
  
  
  
  const fetchStudentData = async (email:string) => {
    try {
      const response = await fetch(`${apiUrl}/members/${email}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Student not found in Colorstack database');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudentData(data);
      return data;
    } catch (error) {
      console.error('Error fetching student data:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, supabase, checkAndActivateUser, signIn, fetchStudentData, studentData }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};