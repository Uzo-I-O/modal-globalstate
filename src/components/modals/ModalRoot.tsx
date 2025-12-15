import React from 'react';
import { useModalStore } from '../../store';
import UniversalModal from './UniversalModal';

const ModalRoot: React.FC = () => {
  const { modals } = useModalStore();

  if (modals.length === 0) {
    return null;
  }

  return (
    <div id="modal-root">
      {modals.map((config, index) => (
        <UniversalModal
          key={config.id}
          config={config}
          isLast={index === modals.length - 1}
        />
      ))}
    </div>
  );
};

export default ModalRoot;