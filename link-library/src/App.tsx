import React, { useState, useEffect } from 'react';
import AddLinkForm from './components/AddLinkForm';
import SearchBar from './components/SearchBar';
import type { LinkCategory } from './components/SearchBar';
import './App.css';

interface Link {
  id: number;
  title: string;
  url: string;
  category: 'Documentation' | 'Tools' | 'Tutorials';
}

const App: React.FC = () => {
  // Load data from localStorage on first run, or use defaults
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem('link-library-data');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<LinkCategory>('All');
  const [darkMode, setDarkMode] = useState(false);

  // Automatically save to localStorage whenever the 'links' state changes
  useEffect(() => {
    localStorage.setItem('link-library-data', JSON.stringify(links));
  }, [links]);

  const addLink = (title: string, url: string, category: Link['category']) => {
    const newLink: Link = {
      id: Date.now(), // Unique ID based on time
      title,
      url,
      category
    };
    setLinks([newLink, ...links]);
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(normalizedSearch) ||
      link.url.toLowerCase().includes(normalizedSearch) ||
      link.category.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      categoryFilter === 'All' || link.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="brand">
          <span className="logo-icon">📚</span>
          <h1>Link<span>Library</span></h1>
        </div>
        <div className="controls">
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
          />
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="dashboard">
        <aside className="sidebar">
          {/* We pass the 'addLink' function as a prop to our component */}
          <AddLinkForm onAdd={addLink} />
        </aside>

        <section className="link-grid">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <div key={link.id} className="link-card">
                <div className="card-header">
                  <span className={`badge ${link.category.toLowerCase()}`}>{link.category}</span>
                </div>
                <h4>{link.title}</h4>
                <p className="link-url">{link.url}</p>
                <a href={link.url} target="_blank" rel="noreferrer" className="card-action">
                  Visit Resource <span className="arrow">→</span>
                </a>
              </div>
            ))
          ) : (
            <p className="empty-state">No links found. Try adding one!</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;