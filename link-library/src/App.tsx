import React, { useState } from 'react';
import './App.css';

// 1. Defined Interface (Jonei can refine this later)
interface Link {
  id: number;
  title: string;
  url: string;
  category: 'Documentation' | 'Tools' | 'Tutorials';
}

const initialLinks: Link[] = [
  { id: 1, title: 'React Docs', url: 'https://react.dev', category: 'Documentation' },
  { id: 2, title: 'Vite Guide', url: 'https://vitejs.dev', category: 'Tools' },
  { id: 3, title: 'GitHub Skills', url: 'https://skills.github.com', category: 'Tutorials' },
  { id: 4, title: 'TS Handbook', url: 'https://typescriptlang.org', category: 'Documentation' },
  { id: 5, title: 'Tailwind Labs', url: 'https://tailwindcss.com', category: 'Tools' },
];

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
              onChange={handleSearchChange}
            />
          </div>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="dashboard">
        <aside className="sidebar">
          <div className="add-link-card">
            <h3>Add New Resource</h3>
            <p className="subtitle">Share useful links with the team</p>
            <form className="add-form">
              <input type="text" placeholder="Resource Title (e.g. React Docs)" />
              <input type="url" placeholder="URL (https://...)" />
              <select defaultValue="">
                <option value="" disabled>Select Category</option>
                <option value="Documentation">Documentation</option>
                <option value="Tools">Tools</option>
                <option value="Tutorials">Tutorials</option>
              </select>
              <button type="button" className="btn-primary">Add to Library</button>
            </form>
          </div>
        </aside>

        <section className="link-grid">
          {filteredLinks.map((link) => (
            <div key={link.id} className="link-card">
              <div className="card-header">
                <span className={`badge ${link.category.toLowerCase()}`}>{link.category}</span>
              </div>
              <h4>{link.title}</h4>
              <p className="link-url">{link.url.replace(/^https?:\/\//, '')}</p>
              <a href={link.url} target="_blank" rel="noreferrer" className="card-action">
                Visit Resource <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>Collaboration Project</p>
      </footer>
    </div>
  );
}

export default App;