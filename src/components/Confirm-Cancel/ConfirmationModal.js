// ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h4>Are you sure you want to cancel?</h4>
          <div className="modal-actions">
            <button className="btn-confirm" onClick={onConfirm}>
              Confirm
            </button>
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
