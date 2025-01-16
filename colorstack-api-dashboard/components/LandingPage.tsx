'use client'

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { HandHeart, Github } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';
import Popup from './Popup';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email);
      setPopupMessage('OTP sent to your email. Please check your inbox.');
      setPopupType('success');
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Sign in error:', error);
      setPopupMessage('An error occurred. Please try again.');
      setPopupType('error');
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-sage-600 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Image src="/assets/logo.png" alt="ColorStack" width={200} height={200} />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">API Dashboard</h2>
        <p className="text-center text-gray-600 mb-8">Enter your email to receive an OTP</p>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
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
      <Popup
        message={popupMessage}
        type={popupType}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default LandingPage;

