"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!supabaseUrl || !supabaseKey || !apiUrl) {
  throw new Error("Missing environment variables.");
}

const supabase = createClientComponentClient()

interface Student {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  supabase: typeof supabase;
  checkAndActivateUser: (email: string) => Promise<boolean>;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  fetchStudentData: (email: string) => Promise<Student>;
  studentData: Student | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      if (session) {
        setUser(session.user);
        try {
          await fetchStudentData(session.user.email!);
          router.push('/dashboard');
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        if (session?.user?.email) {
          try {
            await fetchStudentData(session.user.email);
            router.push('/dashboard');
          } catch (error) {
            console.error('Error fetching student data:', error);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setStudentData(null);
        router.push('/');
      }
    });

    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const checkAndActivateUser = async (email: string): Promise<boolean> => {
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('email')
      .eq('email', email)
      .single();

    if (studentError || !studentData) {
      throw new Error('Student not found in Colorstack database');
    }

    const { data: activatedData, error: activatedError } = await supabase
      .from('api_activated')
      .select('email')
      .eq('email', email)
      .single();

    if (activatedError && activatedError.code !== 'PGRST116') {
      throw new Error('Error checking activation status');
    }

    if (activatedData) {
      throw new Error('Email already activated');
    }

    const { error: insertError } = await supabase
      .from('api_activated')
      .insert({ email });

    if (insertError) {
      throw new Error('Error activating account');
    }

    return true;
  };

  const signIn = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          email
        }
      }
    });
    if (error) throw error;
  };
  
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
    setStudentData(null);
    router.push('/');
  };
  
  const fetchStudentData = async (email: string): Promise<Student> => {
    try {
      const response = await fetch(`${apiUrl}/members/${email}`);
      if (!response.ok) {
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
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      supabase, 
      checkAndActivateUser, 
      signIn, 
      signOut, 
      fetchStudentData, 
      studentData 
    }}>
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

