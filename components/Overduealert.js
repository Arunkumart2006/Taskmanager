import React from 'react';

function OverdueAlert({ count, onClose }) {
  return (
    <div className="alert">
      <button 
        className="alert-close"
        onClick={onClose}
      >
        ×
      </button>
      <h4>⚠️ Overdue Tasks!</h4>
      <p>
        You have {count} overdue task{count > 1 ? 's' : ''}. 
        Please review and update!
      </p>
    </div>
  );
}

export default OverdueAlert;
