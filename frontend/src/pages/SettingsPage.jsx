import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Mail, Github, Linkedin } from "lucide-react";

const SettingsPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 pb-20 max-w-4xl bg-[#809076]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-[#111A19] border border-[#809076]/40 shadow-lg flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-[#284139] border-2 border-[#809076]">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-[#F0D794]" />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-[#F0D794] text-center">{authUser?.fullName}</h2>
          <div className="flex items-center gap-2 text-[#F0D794]/80">
            <Mail className="w-5 h-5 text-[#809076]" />
            <span className="text-sm">{authUser?.email}</span>
          </div>
        </div>

        {/* Links Card */}
        <div className="p-6 rounded-2xl bg-[#111A19] border border-[#809076]/40 shadow-lg flex flex-col gap-4 text-[#F0D794]">
          <a href="https://www.linkedin.com/in/sara-singh-574673267/" target="_blank" className="flex items-center gap-2 transition-colors hover:text-[#F0D794]/80">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a href="https://github.com/sarasinghrse" target="_blank" className="flex items-center gap-2 transition-colors hover:text-[#F0D794]/80">
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a href="mailto:sarasingh2k27@gmail.com" className="flex items-center gap-2 transition-colors hover:text-[#F0D794]/80">
            <Mail className="w-5 h-5" /> Email
          </a>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
