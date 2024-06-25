import { useRouter } from "next/router";

import React from 'react';
export default function Signup(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D5EEFF] to-[#FFEDFA]">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4">AI Solucions</h1>
            <h2 className="text-xl font-semibold text-center mb-6">Let’s Get Started</h2>
            <p className="text-center text-purple-600 mb-6">Key in your details to sign up for this app</p>
            <form>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Number"
                className="w-full p-3 mb-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full p-3 mb-4 border rounded"
              />
              <button
                type="submit"
                className="w-full p-3 bg-darkblue text-white font-semibold rounded"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      );
    }
