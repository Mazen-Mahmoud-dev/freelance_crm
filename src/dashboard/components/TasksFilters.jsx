import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TasksFilters = ({ filter, setFilter, sortBy, setSortBy }) => {

  const [openSort, setOpenSort] = useState(false);

  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in_progress", label: "In Progress" },
    { key: "completed", label: "Completed" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

      {/* Filters */}
      <div className="flex gap-2">

        {filters.map(item => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`px-3 py-1 rounded-md border ${
              filter === item.key
                ? "bg-primary text-white"
                : "bg-card border-border text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      {/* Sort */}
      <div className="relative flex items-center gap-3">

        Sort By

        <button
          onClick={() => setOpenSort(prev => !prev)}
          className="px-4 py-2 bg-card border border-border rounded-md text-sm flex items-center gap-2"
        >
          {sortBy === "newest"
            ? "Newest"
            : sortBy === "oldest"
            ? "Oldest"
            : "A → Z"}

          <span className="text-xs opacity-70">▼</span>
        </button>

        {openSort && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-0 top-10 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <button
              onClick={() => {
                setSortBy("newest");
                setOpenSort(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300"
            >
              Newest
            </button>

            <button
              onClick={() => {
                setSortBy("oldest");
                setOpenSort(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300"
            >
              Oldest
            </button>

            <button
              onClick={() => {
                setSortBy("az");
                setOpenSort(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300"
            >
              A → Z
            </button>

          </motion.div>
        )}

      </div>

    </div>
  );
};

export default TasksFilters;