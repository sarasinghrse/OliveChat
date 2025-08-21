import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-[#DCE5DC]">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-[#DCE5DC]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => {
          const isOwn = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              <div className="flex flex-col max-w-xs sm:max-w-sm gap-1">
                {/* Avatar */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#809076]">
                    <img
                      src={
                        isOwn
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Timestamp */}
                  <time className="text-xs text-[#4B5D51] opacity-70">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                {/* Message bubble */}
                <div
                  className={`rounded-lg px-4 py-2 text-sm shadow ${
                    isOwn
                      ? "bg-[#B86830] text-[#F0D794] self-end"
                      : "bg-white text-[#2F3E34]"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
