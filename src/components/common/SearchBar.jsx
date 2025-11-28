import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="px-5 mx-10 mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3f89] focus:border-transparent"
      />
    </div>
  );
}
