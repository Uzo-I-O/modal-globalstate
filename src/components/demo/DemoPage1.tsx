import React from 'react';
import { useModalActions } from '../../store';

const DemoPage1: React.FC = () => {
  const { openModal } = useModalActions();

  const openConfirmationModal = () => {
    openModal({
      type: 'confirmation',
      title: 'Delete Account',
      data: {
        message: 'Are you sure you want to delete your account? This action cannot be undone.',
        confirmText: 'Delete Account',
        cancelText: 'Keep Account'
      }
    });
  };

  const openFormModal = () => {
    openModal({
      type: 'form',
      title: 'User Profile',
      size: 'large',
      data: {
        fields: [
          {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true
          },
          {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
            validation: {
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              message: 'Please enter a valid email address'
            }
          },
          {
            name: 'role',
            type: 'select',
            label: 'Role',
            required: true,
            options: [
              { value: 'admin', label: 'Administrator' },
              { value: 'user', label: 'User' },
              { value: 'moderator', label: 'Moderator' }
            ]
          },
          {
            name: 'bio',
            type: 'textarea',
            label: 'Bio',
            placeholder: 'Tell us about yourself...'
          },
          {
            name: 'notifications',
            type: 'checkbox',
            label: 'Enable email notifications'
          }
        ]
      }
    });
  };

  const openInfoModal = () => {
    openModal({
      type: 'info',
      title: 'About This Feature',
      data: {
        message: 'This is a demo of the global modal system. It supports multiple modal types, custom strategies, and schema-based rendering.'
      }
    });
  };

  const openErrorModal = () => {
    openModal({
      type: 'error',
      title: 'Connection Error',
      data: {
        message: 'Failed to connect to the server',
        details: 'Error: ECONNREFUSED - Connection refused at 127.0.0.1:3000'
      }
    });
  };

  return (
    <div className="demo-page">
      <div className="demo-card">
        <h2>Demo Page 1 - User Management</h2>
        <p>This page demonstrates various modal types for user management scenarios.</p>
        
        <div className="button-grid">
          <button 
            className="btn btn-danger"
            onClick={openConfirmationModal}
          >
            Delete Account
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={openFormModal}
          >
            Edit Profile
          </button>
          
          <button 
            className="btn btn-info"
            onClick={openInfoModal}
          >
            Show Info
          </button>
          
          <button 
            className="btn btn-warning"
            onClick={openErrorModal}
          >
            Simulate Error
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage1;