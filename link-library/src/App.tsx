import React, { useState, useEffect } from 'react';
import AddLinkForm from './components/AddLinkForm';
import SearchBar from './components/SearchBar';
import PinButton from './components/PinButton';
import type { LinkCategory } from './components/SearchBar';
import RemoveButton from './components/RemoveButton';
import './App.css';

interface Link {
  id: number;
  title: string;
  url: string;
  isPinned: boolean;
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

  // Update your addLink function
const addLink = (title: string, url: string, category: Link['category']) => {
  const newLink: Link = {
    id: Date.now(),
    title,
    url,
    category,
    isPinned: false // Initialize as false
  };
  setLinks([newLink, ...links]);
};

const removeLink = (id: number) => {
  setLinks(prev => prev.filter(link => link.id !== id));
};

// New Function: Toggle Pin
const togglePin = (id: number) => {
  setLinks(prev => prev.map(link => 
    link.id === id ? { ...link, isPinned: !link.isPinned } : link
  ));
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
  })
    .sort((a, b) => {
  if (a.isPinned !== b.isPinned) {
    return a.isPinned ? -1 : 1;
  }
  return b.id - a.id; // Newest links appear first if pinned status is equal
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
              <div key={link.id} className={`link-card ${link.isPinned ? 'pinned' : ''}`}>
                {/* Add the Action Buttons */}
                <div className="card-actions">
                 <PinButton 
                    isPinned={link.isPinned} 
                    onToggle={() => togglePin(link.id)} 
                  />
                  <RemoveButton onRemove={() => removeLink(link.id)} />
                </div>

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