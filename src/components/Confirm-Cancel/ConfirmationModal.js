// ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css'; // Make sure to create a corresponding CSS file for styling

function ConfirmationModal({ show, message, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="message-header">Confirm</p>
        <p className="message-con_can">{message}</p>
        <div className="buttons">
          <button className="confirm" onClick={onConfirm}>Yes</button>
          <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
