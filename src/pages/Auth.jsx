// src/pages/Auth.jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const request = searchParams.get("request") || "login";
  const [isSignup, setIsSignup] = useState(request === "signup");

  useEffect(() => {
    setIsSignup(request === "signup");
  }, [request]);

  const toggleAuth = () => {
    const newMode = isSignup ? "login" : "signup";
    setSearchParams({ request: newMode });
  };

  return (
    <div className="mt-12 flex items-center justify-center p-6 ">
      <div className="w-[380px] relative perspective ">
        {/* Toggle */}
        <div className="flex justify-between items-center bg-white shadow rounded-full px-4 py-2 mb-6">
          <button
            className={`w-1/2 text-center font-medium py-2 rounded-full transition ${
              !isSignup ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
            onClick={() => setSearchParams({ request: "login" })}
          >
            Log In
          </button>
          <button
            className={`w-1/2 text-center font-medium py-2 rounded-full transition ${
              isSignup ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
            onClick={() => setSearchParams({ request: "signup" })}
          >
            Sign Up
          </button>
        </div>

        {/* Form Flip Container */}
        <div
          className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
            isSignup ? "rotate-y-180" : ""
          }`}
        >
          {/* Login Form */}
            <LoginForm toggleAuth={toggleAuth} />
          {/* Signup Form */}
            <RegisterForm toggleAuth={toggleAuth} />
        </div>
      </div>
    </div>
  );
}
