import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Mail } from "lucide-react";

const SettingsPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 pb-20 max-w-4xl bg-[#809076]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-[#284139] shadow-lg flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-[#111A19] border-2 border-[#809076]">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-[#F0D794]" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-[#F0D794]">{authUser?.fullName}</h2>
          <div className="flex items-center gap-2 text-[#F0D794]/80">
            <Mail className="w-4 h-4 text-[#809076]" />
            <span>{authUser?.email}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#111A19] border border-[#809076]/40 shadow-lg flex flex-col gap-3 text-[#F0D794]">
          <a href="#" className="transition-colors hover:text-[#B86830]">Privacy Policy</a>
          <a href="https://www.linkedin.com/in/YOUR-LINKEDIN" className="transition-colors hover:text-[#B86830]">LinkedIn</a>
          <a href="https://github.com/YOUR-GITHUB" className="transition-colors hover:text-[#B86830]">GitHub</a>
          <a href="mailto:YOUR-EMAIL" className="transition-colors hover:text-[#B86830]">Email</a>
        </div>

      </div>
    </div>
  );
  
};

export default SettingsPage;
