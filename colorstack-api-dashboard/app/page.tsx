"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { HandHeart } from "lucide-react";
import { Github } from "lucide-react";
import Link from "next/link";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { signIn, checkAndActivateUser, fetchStudentData } = useAuth();

  const handleActivation = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await checkAndActivateUser(email);
      const studentData = await fetchStudentData(email);
      console.log('Student data:', studentData);
      alert(`Account activated successfully for ${studentData.first_name} ${studentData.last_name}! Check your email for the activation link.`);
      await signIn(email);
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const studentData = await fetchStudentData(email);
      await signIn(email);
      alert(`Welcome back, ${studentData.first_name}! Check your email for the login link.`);
    } catch (error: any) {
      if (error.message === 'Student not found in Colorstack database') {
        alert('Sorry, we couldn\'t find your account. Please check your email or contact support.');
      } else {
        alert('Sorry, we couldn\'t find your account. Please check your email or contact support.');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-14">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <img
          className="h-12 w-auto mx-auto"
          src="./assets/logo.png"
          alt="ColorStack"
        />
        <h2 className="p-2 text-3xl font-bold text-center text-gray-800 mb-8">
         API-Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your ColorStack email to activate or sign in to your account
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleActivation}
              className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activate
            </button>
            <button
              onClick={handleSignIn}
              className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <HandHeart size={32} />
            <Link href="https://github.com/BeteabTefera/Winter-Break-24-Hackathon" target="_blank">
              <Github size={32} />
            </Link>
          </div>
          <p className=" p-3 text-center text-gray-600 mb-8">
            By Stackers for Stackers 
          </p>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
