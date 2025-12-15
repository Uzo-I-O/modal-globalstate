import React from 'react';
import { ModalRegistry } from '../../types';

// Import modal components
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';
import InfoModal from './InfoModal';
import WarningModal from './WarningModal';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

// Registry of all available modal types
export const MODAL_REGISTRY: ModalRegistry = {
  confirmation: ConfirmationModal,
  form: FormModal,
  info: InfoModal,
  warning: WarningModal,
  error: ErrorModal,
  success: SuccessModal,
};

// Helper function to register new modal types
export const registerModal = (type: string, component: React.ComponentType<any>) => {
  MODAL_REGISTRY[type] = component;
};

// Helper function to get modal component by type
export const getModalComponent = (type: string): React.ComponentType<any> | null => {
  return MODAL_REGISTRY[type] || null;
};