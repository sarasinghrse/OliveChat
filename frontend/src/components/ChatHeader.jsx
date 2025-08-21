import React from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-[#CBD8C8] bg-[#DCE5DC]">
      <div className="flex items-center justify-between">
        {/* User info group */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#809076]"
            />
          </div>

          {/* Name & Status */}
          <div className="leading-tight">
            <h3 className="font-semibold text-[#2F3E34]">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1 text-sm text-[#4B5D51]">
              <span
                className={`h-2 w-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-md hover:bg-[#CBD8C8] transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-[#4B5D51]" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
