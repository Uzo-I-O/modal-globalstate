import React from 'react';
import { ModalConfig } from '../../types';

interface InfoModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const message = data?.message || 'Information';

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="info-icon">ℹ️</div>
        <div className="info-message">{message}</div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={() => onAction('ok')}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default InfoModal;