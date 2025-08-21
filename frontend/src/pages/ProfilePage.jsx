import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-[#809076]/10">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-[#284139] rounded-2xl shadow-lg p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#F0D794]">Profile</h1>
            <p className="mt-2 text-[#F0D794]/70">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-[#809076]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-[#B86830] hover:bg-[#809076] 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-[#F0D794]" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-[#F0D794]/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-[#F0D794]/70 flex items-center gap-2">
                <User className="w-4 h-4 text-[#809076]" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-[#111A19] text-[#F0D794] rounded-lg border border-[#809076]">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-[#F0D794]/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#809076]" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-[#111A19] text-[#F0D794] rounded-lg border border-[#809076]">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#111A19] rounded-xl p-6 border border-[#809076]/40">
            <h2 className="text-lg font-medium text-[#F0D794] mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-[#F0D794]/90">
              <div className="flex items-center justify-between py-2 border-b border-[#809076]/40">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
