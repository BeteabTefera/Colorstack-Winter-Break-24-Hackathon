'use client'
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { HandHeart, Github } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { signIn, checkAndActivateUser, fetchStudentData } = useAuth();

  const handleActivation = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await checkAndActivateUser(email);
      const studentData = await fetchStudentData(email);
      alert(`Account activated successfully for ${studentData.first_name} ${studentData.last_name}! Check your email for the activation link.`);
      await signIn(email);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const studentData = await fetchStudentData(email);
  
      if (!studentData.activated_at) {
        alert('Your account is not activated. Please activate your account first.');
        return;
      }
  
      await signIn(email);
      alert(`Welcome, ${studentData.first_name}! Check your email for the login link.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Student not found in Colorstack database') {
          alert('Sorry, we couldn\'t find your account. Please check your email or contact support.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-sage-600 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Image src="/assets/logo.png" alt="ColorStack" width={200} height={200} />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">API Dashboard</h2>
        <p className="text-center text-gray-600 mb-8">Enter your ColorStack email to activate or sign in</p>
        <form className="space-y-6">
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              onClick={handleActivation}
              className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Activate
            </button>
            <button
              onClick={handleSignIn}
              className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-8 flex justify-center space-x-4">
          <HandHeart size={24} className="text-gray-500" />
          <Link href="https://github.com/BeteabTefera/Winter-Break-24-Hackathon" target="_blank">
            <Github size={24} className="text-gray-500" />
          </Link>
        </div>
        <p className="mt-4 text-center text-gray-600">By Stackers for Stackers</p>
      </div>
    </div>
  );
};

export default LandingPage;

