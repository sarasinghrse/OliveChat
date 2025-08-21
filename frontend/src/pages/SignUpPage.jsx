import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-[#809076]/10 pt-10">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-[#284139] rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#809076]/40">
                <MessageSquare className="w-6 h-6 text-[#F0D794]" />
              </div>
              <h1 className="text-2xl font-bold text-[#F0D794] mt-2">
                Create Account
              </h1>
              <p className="text-[#F0D794]/70">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium text-[#F0D794]">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#809076]" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#809076] bg-[#111A19] text-[#F0D794] placeholder-[#809076] focus:outline-none focus:ring-2 focus:ring-[#B86830]"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-[#F0D794]">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#809076]" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#809076] bg-[#111A19] text-[#F0D794] placeholder-[#809076] focus:outline-none focus:ring-2 focus:ring-[#B86830]"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-[#F0D794]">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#809076]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-[#809076] bg-[#111A19] text-[#F0D794] placeholder-[#809076] focus:outline-none focus:ring-2 focus:ring-[#B86830]"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#809076]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#809076]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-[#B86830] text-[#F0D794] hover:bg-[#809076] hover:text-[#111A19] transition-colors disabled:opacity-70"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#F0D794]/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#F0D794] hover:text-[#B86830] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
