import React from 'react';

export type LinkCategory = 'All' | 'Documentation' | 'Tools' | 'Tutorials';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  categoryFilter: LinkCategory;
  onCategoryFilterChange: (value: LinkCategory) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  categoryFilter,
  onCategoryFilterChange,
}) => {
  return (
    <div className="search-controls">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by title, URL, or category..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>

      <select
        className="category-filter"
        value={categoryFilter}
        onChange={(e) => onCategoryFilterChange(e.target.value as LinkCategory)}
      >
        <option value="All">All Categories</option>
        <option value="Documentation">Documentation</option>
        <option value="Tools">Tools</option>
        <option value="Tutorials">Tutorials</option>
      </select>
    </div>
  );
};

export default SearchBar;
