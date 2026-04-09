import React, { useState } from 'react';

// We define what the 'onAdd' function looks like via types
interface AddLinkFormProps {
  onAdd: (title: string, url: string, category: 'Documentation' | 'Tools' | 'Tutorials') => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<'Documentation' | 'Tools' | 'Tutorials'>('Documentation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return alert("Please fill in all fields!");
    
    onAdd(title, url, category);
    
    // Clear the form
    setTitle('');
    setUrl('');
  };

  return (
    <div className="add-link-card">
      <h3>Add New Resource</h3>
      <p className="subtitle">Share useful links with the team</p>
      <form className="add-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Resource Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="url" 
          placeholder="URL (https://...)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as any)}
        >
          <option value="Documentation">Documentation</option>
          <option value="Tools">Tools</option>
          <option value="Tutorials">Tutorials</option>
        </select>
        <button type="submit" className="btn-primary">Add to Library</button>
      </form>
    </div>
  );
};

export default AddLinkForm;