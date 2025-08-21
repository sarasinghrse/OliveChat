import React from "react";
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#f3f4f6] pt-14">
      <div className="max-w-md text-center">
        {/* Decorative Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 2 === 0
                  ? "bg-[#6A8F72] animate-pulse"
                  : "bg-[#DCE5DC]"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#2F3E34] mb-4">{title}</h2>

        {/* Subtitle */}
        <p className="text-[#4B5D51]">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
