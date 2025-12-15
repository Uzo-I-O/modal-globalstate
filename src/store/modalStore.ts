import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ModalConfig, ModalState } from '../types';

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      modals: [],
      
      openModal: (config: ModalConfig) => {
        set((state) => {
          // Prevent duplicate modals with same ID
          const existingModal = state.modals.find(modal => modal.id === config.id);
          if (existingModal) {
            console.warn(`Modal with ID "${config.id}" is already open`);
            return state;
          }
          
          return {
            modals: [...state.modals, {
              size: 'medium',
              closable: true,
              backdrop: true,
              ...config,
            }]
          };
        });
      },
      
      closeModal: (id?: string) => {
        set((state) => {
          if (!id) {
            // Close the most recent modal if no ID provided
            return {
              modals: state.modals.slice(0, -1)
            };
          }
          
          const modalToClose = state.modals.find(modal => modal.id === id);
          if (modalToClose?.onClose) {
            modalToClose.onClose();
          }
          
          return {
            modals: state.modals.filter(modal => modal.id !== id)
          };
        });
      },
      
      closeAllModals: () => {
        const { modals } = get();
        // Call onClose for all modals that have it
        modals.forEach(modal => {
          if (modal.onClose) {
            modal.onClose();
          }
        });
        
        set({ modals: [] });
      },
      
      updateModal: (id: string, updates: Partial<ModalConfig>) => {
        set((state) => ({
          modals: state.modals.map(modal =>
            modal.id === id ? { ...modal, ...updates } : modal
          )
        }));
      }
    }),
    {
      name: 'modal-store',
    }
  )
);

// Convenience hook for opening modals with auto-generated IDs
export const useModalActions = () => {
  const { openModal, closeModal, closeAllModals, updateModal } = useModalStore();
  
  const openModalWithId = (config: Omit<ModalConfig, 'id'> & { id?: string }) => {
    const id = config.id || `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    openModal({ ...config, id });
    return id;
  };
  
  return {
    openModal: openModalWithId,
    closeModal,
    closeAllModals,
    updateModal
  };
};