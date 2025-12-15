import React from 'react';
import { ModalConfig } from '../../types';

interface SuccessModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const message = data?.message || 'Success!';

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="success-icon">✅</div>
        <div className="success-message">{message}</div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={() => onAction('close')}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;