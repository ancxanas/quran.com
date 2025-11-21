import { Surah } from "@/app/types/surah";
import { useState, useMemo } from "react";
import SearchIcon from "../../../public/icons/search.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-6 relative group w-full max-w-xl mx-auto sm:max-w-full p-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-text-secondary group-focus-within:text-text-primary" />
      </div>
      <input
        type="text"
        placeholder="Search by Surah Name or Number..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-3 border border-border rounded-md leading-5 bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:border-text-primary focus:ring-text-primary sm:text-sm transition-colors font-figtree"
      />
    </div>
  );
}
