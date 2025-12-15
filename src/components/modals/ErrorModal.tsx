import React from 'react';
import { ModalConfig } from '../../types';

interface ErrorModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const message = data?.message || 'An error occurred';
  const details = data?.details;

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="error-icon">❌</div>
        <div className="error-message">{message}</div>
        {details && (
          <div className="error-details">
            <details>
              <summary>Details</summary>
              <pre>{details}</pre>
            </details>
          </div>
        )}
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

export default ErrorModal;