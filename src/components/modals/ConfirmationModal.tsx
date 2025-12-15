import React from 'react';
import { ModalConfig } from '../../types';

interface ConfirmationModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const message = data?.message || 'Are you sure you want to proceed?';
  const confirmText = data?.confirmText || 'Confirm';
  const cancelText = data?.cancelText || 'Cancel';

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="confirmation-icon">⚠️</div>
        <p className="confirmation-message">{message}</p>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          onClick={() => onAction('cancel')}
        >
          {cancelText}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onAction('confirm', data)}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;