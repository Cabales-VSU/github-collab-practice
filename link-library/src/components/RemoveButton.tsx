import React from 'react';

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <button 
      onClick={onRemove} 
      className="delete-btn"
      title="Remove Link"
      style={{
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0 5px',
        transition: 'color 0.2s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
    >
      &times;
    </button>
  );
};

export default RemoveButton;