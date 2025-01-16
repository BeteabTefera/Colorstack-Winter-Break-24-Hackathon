"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Popup from '@/components/Popup';

const baseUrl = process.env.NEXT_PUBLIC_URL
const supabase = createClientComponentClient()

interface Student {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  activated_at: string | null;
}

interface AuthContextType {
  user: User | null;
  supabase: typeof supabase;
  signIn: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  fetchStudentData: (email: string) => Promise<Student>;
  studentData: Student | null;
  popupMessage: string;
  setPopupMessage: React.Dispatch<React.SetStateAction<string>>;
  popupType: 'success' | 'error';
  setPopupType: React.Dispatch<React.SetStateAction<'success' | 'error'>>;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const signIn = async (email: string): Promise<void> => {
    try {
      // Step 1: Check if the user exists in the students table
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('email, first_name, last_name, activated_at')
        .eq('email', email)
        .single();
    
      if (studentError || !studentData) {
        throw new Error('Student not found in Colorstack database');
      }
    
      // Step 2: Check if the student is new by checking the activated_at field
      const isNewStudent = !studentData.activated_at;
      
      if (isNewStudent) {
        // Step 3: If the student is new, update activated_at with the current timestamp
        const { error: updateError } = await supabase
          .from('students')
          .update({ activated_at: new Date().toISOString() })
          .eq('email', email);
    
        if (updateError) {
          throw new Error('Error updating student data');
        }
    
        // Step 4: Insert the student email into the api_activated table
        const { error: insertActivatedError } = await supabase
          .from('api_activated')
          .insert([{ email }]);
    
        if (insertActivatedError) {
          throw new Error('Error inserting into api_activated table');
        }
    
        // Step 5: Insert the student data into the api_usage table
        const { error: insertUsageError } = await supabase
          .from('api_usage')
          .insert([{ email, first_name: studentData.first_name, last_name: studentData.last_name }]);
    
        if (insertUsageError) {
          throw new Error('Error inserting into api_usage table');
        }
      }
    
      // Step 6: Use Supabase Auth to sign in with OTP, allowing user creation
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // This allows new users to be created
          emailRedirectTo: `${baseUrl}/verify`,
        }
      });
    
      if (authError) {
        throw authError;
      }
    
      // Step 7: Redirect to OTP verification page
      router.push(`${baseUrl}/verify?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Sign in error:', error);
      if (error instanceof Error) {
        setPopupMessage(error.message);
        setPopupType('error');
        setIsPopupOpen(true);
      } else {
        setPopupMessage('An unexpected error occurred. Please try again.');
        setPopupType('error');
        setIsPopupOpen(true);
      }
      throw error;
    }
  };
  

  const verifyOTP = async (email: string, token: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) throw error;

      // If successful, the user will be automatically signed in
      // and the onAuthStateChange listener will handle the redirection
    } catch (error) {
      console.error('OTP verification error:', error);
      if (error instanceof Error) {
        setPopupMessage(error.message);
        setPopupType('error');
        setIsPopupOpen(true);
      } else {
        setPopupMessage('An unexpected error occurred. Please try again.');
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
  };
  
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    router.push(`${baseUrl}/`);
    setUser(null);
    setStudentData(null);
  };
  
  const fetchStudentData = async (email: string): Promise<Student> => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Student not found');

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
      signIn, 
      verifyOTP,
      signOut, 
      fetchStudentData, 
      studentData,
      popupMessage,
      setPopupMessage,
      popupType,
      setPopupType,
      isPopupOpen,
      setIsPopupOpen
    }}>
      {children}
      <Popup
        message={popupMessage}
        type={popupType}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
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

