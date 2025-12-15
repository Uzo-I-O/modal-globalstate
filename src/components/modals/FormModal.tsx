import React, { useState } from 'react';
import { ModalConfig, FormField } from '../../types';

interface FormModalProps {
  config: ModalConfig;
  onAction: (actionId: string, data?: any) => void;
}

const FormModal: React.FC<FormModalProps> = ({ config, onAction }) => {
  const { data } = config;
  const fields: FormField[] = data?.fields || [];
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.validation && formData[field.name]) {
        const { min, max, pattern, message } = field.validation;
        const value = formData[field.name];
        
        if (min && value.length < min) {
          newErrors[field.name] = message || `Minimum ${min} characters required`;
        }
        
        if (max && value.length > max) {
          newErrors[field.name] = message || `Maximum ${max} characters allowed`;
        }
        
        if (pattern && !new RegExp(pattern).test(value)) {
          newErrors[field.name] = message || 'Invalid format';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAction('submit', formData);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={error ? 'error' : ''}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={error ? 'error' : ''}
            rows={4}
          />
        );
      
      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
            />
            {field.label}
          </label>
        );
      
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={error ? 'error' : ''}
          />
        );
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-body">
        <form className="modal-form">
          {fields.map(field => (
            <div key={field.name} className="form-field">
              {field.type !== 'checkbox' && (
                <label className="field-label">
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>
              )}
              {renderField(field)}
              {errors[field.name] && (
                <span className="field-error">{errors[field.name]}</span>
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          onClick={() => onAction('cancel')}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormModal;