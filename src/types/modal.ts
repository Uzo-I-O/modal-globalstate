import { ReactNode } from 'react';

// Base modal configuration interface
export interface ModalConfig {
  id: string;
  type: string;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closable?: boolean;
  backdrop?: boolean;
  data?: any;
  onClose?: () => void;
}

// Schema-based modal content definition
export interface ModalSchema {
  type: string;
  title?: string;
  content: {
    type: 'form' | 'confirmation' | 'info' | 'custom';
    fields?: FormField[];
    message?: string;
    component?: ReactNode;
  };
  actions?: ModalAction[];
}

// Form field definition for schema renderer
export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Modal action button definition
export interface ModalAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  strategy?: string;
  data?: any;
  disabled?: boolean;
}

// Strategy function signature
export type ModalStrategy = (data?: any, modalId?: string) => void | Promise<void>;

// Modal state interface
export interface ModalState {
  modals: ModalConfig[];
  openModal: (config: ModalConfig) => void;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  updateModal: (id: string, updates: Partial<ModalConfig>) => void;
}

// Registry types
export interface ModalRegistry {
  [key: string]: React.ComponentType<any>;
}

export interface StrategyRegistry {
  [key: string]: ModalStrategy;
}

// Pre-built modal types
export type ModalType = 
  | 'confirmation'
  | 'form'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'custom';