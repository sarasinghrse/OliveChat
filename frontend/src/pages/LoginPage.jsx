import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-[#809076]/10">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-[#284139] rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#809076]/40">
                <MessageSquare className="w-6 h-6 text-[#F0D794]" />
              </div>
              <h1 className="text-2xl font-bold text-[#F0D794] mt-2">
                Welcome Back
              </h1>
              <p className="text-[#F0D794]/70">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-[#B86830] text-[#F0D794] hover:bg-[#809076] hover:text-[#111A19] transition-colors disabled:opacity-70"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#F0D794]/70">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#F0D794] hover:text-[#B86830] transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern 
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};
export default LoginPage;
