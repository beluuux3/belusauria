import React from "react";

export default function Button({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition";

  const variants = {
    primary: "bg-[#ff3f89] text-white hover:bg-[#ac0a56]",
    secondary: "bg-[#ffa2c6] text-gray-800 hover:bg-[#ff3f89] hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
    cancel: "bg-gray-500 text-white hover:bg-gray-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
