import React from 'react';

// Define what the PinButton needs to function
interface PinButtonProps {
  isPinned: boolean;
  onToggle: () => void; // This is the function passed from App.tsx
}

const PinButton: React.FC<PinButtonProps> = ({ isPinned, onToggle }) => {
  return (
    <button 
      className={`pin-button ${isPinned ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation(); // Prevents the click from triggering other card events
        onToggle();
      }}
      aria-label={isPinned ? "Unpin resource" : "Pin resource"}
      title={isPinned ? "Unpin from top" : "Pin to top"}
    >
      📌
    </button>
  );
};

export default PinButton;