import React from "react";

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  accept,
  min,
  step,
  className = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept}
        min={min}
        step={step}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3f89] ${className}`}
      />
    </div>
  );
}
