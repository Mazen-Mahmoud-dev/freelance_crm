import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  

  return (
    <div className="mb-4">
      <input
        type="text"
        
        placeholder="Search by name..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  );
}
