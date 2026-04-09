import React, { useState, useEffect } from 'react';
import AddLinkForm from './components/AddLinkForm';
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
  const [darkMode, setDarkMode] = useState(false);

  // Automatically save to localStorage whenever the 'links' state changes
  useEffect(() => {
    localStorage.setItem('link-library-data', JSON.stringify(links));
  }, [links]);

  const addLink = (title: string, url: string, category: any) => {
    const newLink: Link = {
      id: Date.now(), // Unique ID based on time
      title,
      url,
      category
    };
    setLinks([newLink, ...links]);
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="brand">
          <span className="logo-icon">📚</span>
          <h1>Link<span>Library</span></h1>
        </div>
        <div className="controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search shared resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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