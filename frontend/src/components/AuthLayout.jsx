import React from "react";
import TypingText from "./TypingText";

export default function AuthLayout({ children, title = "Welcome Back", subtitle = "Sign in to continue" }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - image */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/bg.jpg')`,
        }}
      >
        <div className="p-8 text-left max-w-lg text-white">
          <div className="mb-4 text-5xl">📚</div>
          <h2 className="sidebar-brand font-bold mb-2">ShelfLife</h2>
          <p className="mb-6 opacity-90 text-lg font-bold">
            <TypingText text={"WANDER THROUGH SHELVES, DISCOVER YOUR TALE"} speed={200} pause={3000} loop={true} />
          </p>
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
