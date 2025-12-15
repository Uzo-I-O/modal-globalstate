import React from 'react';
import { useModalActions } from '../../store';
import { registerStrategy } from '../../strategies';

const DemoPage3: React.FC = () => {
  const { openModal } = useModalActions();

  // Register custom strategies for this demo
  React.useEffect(() => {
    registerStrategy('customAction', (data, modalId) => {
      console.log('Custom action executed with data:', data);
      alert(`Custom strategy executed! Data: ${JSON.stringify(data)}`);
    });

    registerStrategy('chainedAction', (data, modalId) => {
      const { closeModal, openModal } = require('../../store').useModalStore.getState();
      closeModal(modalId);
      
      openModal({
        id: 'chained-result',
        type: 'success',
        title: 'Chained Action Complete',
        data: {
          message: 'The chained action was executed successfully!'
        }
      });
    });
  }, []);

  const openCustomModal = () => {
    openModal({
      type: 'confirmation',
      title: 'Custom Strategy Demo',
      data: {
        message: 'This modal uses a custom strategy. Click Proceed to execute it.',
        confirmText: 'Proceed',
        cancelText: 'Cancel'
      },
      onClose: () => {
        console.log('Custom modal closed');
      }
    });
  };

  const openFullscreenModal = () => {
    openModal({
      type: 'form',
      title: 'Advanced Configuration',
      size: 'fullscreen',
      backdrop: false,
      data: {
        fields: [
          {
            name: 'projectName',
            type: 'text',
            label: 'Project Name',
            required: true
          },
          {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            placeholder: 'Describe your project in detail...'
          },
          {
            name: 'category',
            type: 'select',
            label: 'Category',
            options: [
              { value: 'web', label: 'Web Application' },
              { value: 'mobile', label: 'Mobile App' },
              { value: 'desktop', label: 'Desktop Software' },
              { value: 'api', label: 'API Service' }
            ]
          },
          {
            name: 'priority',
            type: 'select',
            label: 'Priority',
            options: [
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'urgent', label: 'Urgent' }
            ]
          },
          {
            name: 'deadline',
            type: 'text',
            label: 'Deadline',
            placeholder: 'YYYY-MM-DD'
          },
          {
            name: 'budget',
            type: 'number',
            label: 'Budget ($)',
            placeholder: '0.00'
          }
        ]
      }
    });
  };

  const openChainedModal = () => {
    openModal({
      type: 'info',
      title: 'Chain Demo - Step 1',
      data: {
        message: 'This modal will trigger another modal when you click OK. This demonstrates modal chaining.'
      }
    });
  };

  const openNonClosableModal = () => {
    openModal({
      type: 'warning',
      title: 'System Maintenance',
      closable: false,
      backdrop: false,
      data: {
        message: 'System maintenance is in progress. This modal cannot be closed until the process completes. (This is just a demo - you can still close it from the browser console)'
      }
    });
  };

  return (
    <div className="demo-page">
      <div className="demo-card">
        <h2>Demo Page 3 - Advanced Features</h2>
        <p>This page demonstrates advanced modal features and customization options.</p>
        
        <div className="button-grid">
          <button 
            className="btn btn-primary"
            onClick={openCustomModal}
          >
            Custom Strategy
          </button>
          
          <button 
            className="btn btn-info"
            onClick={openFullscreenModal}
          >
            Fullscreen Modal
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={openChainedModal}
          >
            Chained Modals
          </button>
          
          <button 
            className="btn btn-warning"
            onClick={openNonClosableModal}
          >
            Non-Closable Modal
          </button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Advanced Features Demonstrated:</h3>
          <ul>
            <li>Custom strategies with registerStrategy()</li>
            <li>Fullscreen modal size</li>
            <li>Modal chaining and sequencing</li>
            <li>Non-closable modals</li>
            <li>Custom backdrop behavior</li>
            <li>Modal lifecycle hooks (onClose)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DemoPage3;