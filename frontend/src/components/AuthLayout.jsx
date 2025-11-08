import React from "react";

export default function AuthLayout({ children, title = "Welcome Back", subtitle = "Sign in to continue" }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - dark */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center"> 
        <div className="p-8 text-center max-w-sm">
          <div className="text-5xl mb-6">📚</div>
          <h2 className="text-3xl font-bold mb-2">BookWorm</h2>
          <p className="opacity-80">A simple library management system to track books and borrows.</p>
        </div>
      </div>

      {/* Right panel - form area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md"> 
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-indigo-700 mb-1">{title}</h1>
            <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
