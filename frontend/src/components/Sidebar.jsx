import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-[#F0F4F1] border-r border-[#CBD8C8] flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-[#CBD8C8] w-full p-4">
        <div className="flex items-center gap-2 text-[#4B5D51]">
          <Users className="size-5" />
          <span className="font-medium hidden lg:block text-sm">Contacts</span>
        </div>

        {/* Online only filter */}
        <div className="mt-4 hidden lg:flex items-center gap-2 text-[#4B5D51] text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="accent-emerald-600 w-4 h-4 rounded border border-[#CBD8C8]"
            />
            <span>Show online only</span>
          </label>
          <span className="text-xs text-[#7A8C76]">({Math.max(onlineUsers.length - 1, 0)} online)</span>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 text-left transition-colors
              ${selectedUser?._id === user._id
                ? "bg-[#DCE5DC] ring-1 ring-[#B5C4B0]"
                : "hover:bg-[#E8EFE6]"}
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border border-[#CBD8C8]"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-emerald-500 
                  rounded-full ring-2 ring-[#F0F4F1]"
                />
              )}
            </div>

            {/* User info (hidden on mobile) */}
            <div className="hidden lg:block min-w-0">
              <div className="font-medium text-[#2F3E34] truncate">{user.fullName}</div>
              <div className="text-sm text-[#7A8C76]">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-[#7A8C76] text-sm py-4">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
