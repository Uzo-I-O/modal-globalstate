import { ModalStrategy, StrategyRegistry } from '../types';
import { useModalStore } from '../store';

// Default modal action strategies
export const defaultStrategies: StrategyRegistry = {
  // Close modal strategy
  close: (data?: any, modalId?: string) => {
    const { closeModal } = useModalStore.getState();
    closeModal(modalId);
  },

  // Close all modals strategy
  closeAll: () => {
    const { closeAllModals } = useModalStore.getState();
    closeAllModals();
  },

  // Confirmation strategies
  confirm: (data?: any, modalId?: string) => {
    console.log('Confirmed:', data);
    const { closeModal } = useModalStore.getState();
    closeModal(modalId);
  },

  cancel: (data?: any, modalId?: string) => {
    console.log('Cancelled:', data);
    const { closeModal } = useModalStore.getState();
    closeModal(modalId);
  },

  // Form submission strategy
  submit: (data?: any, modalId?: string) => {
    console.log('Form submitted:', data);
    // Here you would typically send data to API
    const { closeModal } = useModalStore.getState();
    closeModal(modalId);
  },

  // Navigation strategies
  navigate: (data?: any, modalId?: string) => {
    if (data?.url) {
      window.location.href = data.url;
    }
    const { closeModal } = useModalStore.getState();
    closeModal(modalId);
  },

  // Async action example
  saveData: async (data?: any, modalId?: string) => {
    try {
      console.log('Saving data...', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data saved successfully');
      
      const { closeModal, openModal } = useModalStore.getState();
      closeModal(modalId);
      
      // Show success message
      openModal({
        id: 'save-success',
        type: 'success',
        title: 'Success',
        data: { message: 'Data saved successfully!' }
      });
    } catch (error) {
      console.error('Error saving data:', error);
      
      const { openModal } = useModalStore.getState();
      openModal({
        id: 'save-error',
        type: 'error',
        title: 'Error',
        data: { 
          message: 'Failed to save data',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  },

  // Delete confirmation with cascade
  deleteWithConfirmation: (data?: any, modalId?: string) => {
    const { closeModal, openModal } = useModalStore.getState();
    closeModal(modalId);
    
    openModal({
      id: 'delete-confirmation',
      type: 'confirmation',
      title: 'Confirm Deletion',
      data: {
        message: `Are you sure you want to delete "${data?.itemName || 'this item'}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
  },

  // Actual delete action
  performDelete: (data?: any, modalId?: string) => {
    console.log('Deleting item:', data);
    // Perform actual deletion logic here
    const { closeModal, openModal } = useModalStore.getState();
    closeModal(modalId);
    
    openModal({
      id: 'delete-success',
      type: 'success',
      title: 'Deleted',
      data: { message: 'Item deleted successfully' }
    });
  }
};

// Strategy registry that can be extended
export const STRATEGY_REGISTRY: StrategyRegistry = {
  ...defaultStrategies
};

// Helper function to register new strategies
export const registerStrategy = (name: string, strategy: ModalStrategy) => {
  STRATEGY_REGISTRY[name] = strategy;
};

// Helper function to execute a strategy
export const executeStrategy = (strategyName: string, data?: any, modalId?: string) => {
  const strategy = STRATEGY_REGISTRY[strategyName];
  if (strategy) {
    try {
      strategy(data, modalId);
    } catch (error) {
      console.error(`Error executing strategy "${strategyName}":`, error);
      
      // Show error modal
      const { openModal } = useModalStore.getState();
      openModal({
        id: 'strategy-error',
        type: 'error',
        title: 'Error',
        data: {
          message: `Failed to execute action: ${strategyName}`,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  } else {
    console.warn(`Strategy "${strategyName}" not found in registry`);
  }
};

// Get available strategy names
export const getAvailableStrategies = (): string[] => {
  return Object.keys(STRATEGY_REGISTRY);
};