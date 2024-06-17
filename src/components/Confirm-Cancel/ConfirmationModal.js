// ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css'; // Make sure to create a corresponding CSS file for styling

function ConfirmationModal({ show, message, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div className='confirm_cancel'>
      <div className='confirm-content'>
        <p className='confirm-header'>Confirm</p>
        <p className='message-confirm_cancel'>{message}</p>
        <div className='button-confirm_cancel'>
          <button
            className='confirm'
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className='cancel'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
