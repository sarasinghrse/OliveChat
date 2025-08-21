import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-lg bg-[#284139]/90 border-b border-[#809076]">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Brand */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg flex items-center justify-center bg-[#809076]">
                <MessageSquare className="w-5 h-5 text-[#F0D794]" />
              </div>
              <h1 className="text-lg font-bold text-[#F0D794]">Chatty</h1>
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#F0D794] text-[#111A19] hover:bg-[#B86830] hover:text-[#F0D794] transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#B86830] text-[#F0D794] hover:bg-[#809076] hover:text-[#111A19] transition-colors"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-[#111A19] text-[#F0D794] hover:bg-[#809076] hover:text-[#111A19] transition-colors"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
