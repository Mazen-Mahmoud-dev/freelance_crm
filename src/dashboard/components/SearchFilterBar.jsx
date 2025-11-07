import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function SearchFilterBar({onSearch,title=""}) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value)
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-card rounded-xl p-4 shadow-sm">
      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-3 top-3 text-primary" size={18} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={`Search ${title}...`}
          className="w-full pl-10 pr-4 py-2 bg-background text-text outline-none border border-primary rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted"
        />
      </div>
      {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary font-bold bg-bg hover:bg-primary/10 transition text-sm text-text">
        <Filter size={16} className="text-primary" /> Filter
      </button> */}
    </div>
  );
}
