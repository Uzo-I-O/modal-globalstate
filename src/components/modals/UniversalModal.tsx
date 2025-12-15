import React, { useEffect, useRef } from 'react';
import { ModalConfig } from '../../types';
import { getModalComponent } from './registry';
import { executeStrategy } from '../../strategies';
import { useModalStore } from '../../store';

interface UniversalModalProps {
  config: ModalConfig;
  isLast: boolean;
}

const UniversalModal: React.FC<UniversalModalProps> = ({ config, isLast }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModalStore();
  
  const { id, type, title, size = 'medium', closable = true, backdrop = true } = config;

  // Handle escape key and backdrop clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable && isLast) {
        closeModal(id);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        backdrop && 
        closable && 
        isLast && 
        modalRef.current && 
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal(id);
      }
    };

    if (isLast) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, closable, backdrop, isLast, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isLast) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isLast]);

  // Handle actions from modal components
  const handleAction = (actionId: string, data?: any) => {
    executeStrategy(actionId, data, id);
  };

  // Get the appropriate modal component
  const ModalComponent = getModalComponent(type);

  if (!ModalComponent) {
    console.error(`Modal type "${type}" not found in registry`);
    return null;
  }

  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large',
    fullscreen: 'modal-fullscreen'
  };

  return (
    <div className={`modal-overlay ${backdrop ? 'modal-backdrop' : ''}`}>
      <div 
        ref={modalRef}
        className={`modal-container ${sizeClasses[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
      >
        {/* Modal Header */}
        <div className="modal-header">
          {title && (
            <h2 id={`${id}-title`} className="modal-title">
              {title}
            </h2>
          )}
          {closable && (
            <button
              className="modal-close-btn"
              onClick={() => closeModal(id)}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        {/* Modal Content */}
        <ModalComponent
          config={config}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default UniversalModal;