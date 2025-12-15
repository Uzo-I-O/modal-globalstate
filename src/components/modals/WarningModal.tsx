import React from 'react';
import { ModalConfig } from '../../types';

interface WarningModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const message = data?.message || 'Warning: Please review this action';

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="warning-icon">⚠️</div>
        <div className="warning-message">{message}</div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          onClick={() => onAction('dismiss')}
        >
          Dismiss
        </button>
        <button
          className="btn btn-warning"
          onClick={() => onAction('acknowledge')}
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
};

export default WarningModal;