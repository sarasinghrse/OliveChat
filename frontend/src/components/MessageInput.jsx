import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-[#DCE5DC] border-t border-[#CBD8C8]">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-md border border-[#CBD8C8] shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#F0F4F1] border border-[#CBD8C8] flex items-center justify-center"
              type="button"
            >
              <X className="w-3 h-3 text-[#4B5D51]" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Text Input */}
        <div className="flex-1 flex items-center bg-[#F0F4F1] rounded-lg px-3 py-2 border border-[#CBD8C8]">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-transparent focus:outline-none text-sm text-[#2F3E34] placeholder-[#809076]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="ml-2"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Image"
          >
            <Image
              size={20}
              className={`${
                imagePreview ? "text-emerald-600" : "text-[#809076]"
              } hover:text-emerald-700 transition-colors`}
            />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`ml-2 p-2 rounded-full bg-[#4B5D51] text-[#F0F4F1] hover:bg-[#3A4D41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
