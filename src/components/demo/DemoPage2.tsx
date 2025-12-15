import React from 'react';
import { useModalActions } from '../../store';

const DemoPage2: React.FC = () => {
  const { openModal } = useModalActions();

  const openSaveModal = () => {
    openModal({
      type: 'confirmation',
      title: 'Save Changes',
      data: {
        message: 'You have unsaved changes. Would you like to save them now?',
        confirmText: 'Save',
        cancelText: 'Discard'
      }
    });
  };

  const openWarningModal = () => {
    openModal({
      type: 'warning',
      title: 'Storage Warning',
      data: {
        message: 'Your storage is almost full (95% used). Please free up some space or upgrade your plan.'
      }
    });
  };

  const openSuccessModal = () => {
    openModal({
      type: 'success',
      title: 'Payment Successful',
      data: {
        message: 'Your payment of $99.99 has been processed successfully. Your subscription has been renewed for another year.'
      }
    });
  };

  const openLoginForm = () => {
    openModal({
      type: 'form',
      title: 'Sign In',
      size: 'small',
      data: {
        fields: [
          {
            name: 'username',
            type: 'text',
            label: 'Username or Email',
            placeholder: 'Enter your username or email',
            required: true
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            required: true,
            validation: {
              min: 6,
              message: 'Password must be at least 6 characters'
            }
          },
          {
            name: 'rememberMe',
            type: 'checkbox',
            label: 'Remember me for 30 days'
          }
        ]
      }
    });
  };

  const openMultipleModals = () => {
    // Demonstrate opening multiple modals
    openModal({
      id: 'first-modal',
      type: 'info',
      title: 'First Modal',
      data: {
        message: 'This is the first modal. Click OK to open another one.'
      }
    });

    setTimeout(() => {
      openModal({
        id: 'second-modal',
        type: 'warning',
        title: 'Second Modal',
        size: 'large',
        data: {
          message: 'This is the second modal stacked on top of the first one!'
        }
      });
    }, 1000);
  };

  return (
    <div className="demo-page">
      <div className="demo-card">
        <h2>Demo Page 2 - Business Operations</h2>
        <p>This page shows modals for common business operation scenarios.</p>
        
        <div className="button-grid">
          <button 
            className="btn btn-primary"
            onClick={openSaveModal}
          >
            Save Document
          </button>
          
          <button 
            className="btn btn-warning"
            onClick={openWarningModal}
          >
            Check Storage
          </button>
          
          <button 
            className="btn btn-success"
            onClick={openSuccessModal}
          >
            Process Payment
          </button>
          
          <button 
            className="btn btn-info"
            onClick={openLoginForm}
          >
            Sign In
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={openMultipleModals}
          >
            Stack Modals
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage2;