import React from 'react';
import { ModalSchema, ModalConfig } from '../../types';
import { executeStrategy } from '../../strategies';

interface SchemaRendererProps {
  config: ModalConfig;
  schema: ModalSchema;
  onAction: (actionId: string, data?: any) => void;
}

const SchemaRenderer: React.FC<SchemaRendererProps> = ({ config, schema, onAction }) => {
  const { content, actions = [] } = schema;

  const renderContent = () => {
    switch (content.type) {
      case 'form':
        if (content.fields) {
          return (
            <form className="schema-form">
              {content.fields.map(field => (
                <div key={field.name} className="form-field">
                  <label className="field-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  {renderFormField(field)}
                </div>
              ))}
            </form>
          );
        }
        break;
      
      case 'confirmation':
        return (
          <div className="confirmation-content">
            <div className="confirmation-icon">⚠️</div>
            <p className="confirmation-message">{content.message}</p>
          </div>
        );
      
      case 'info':
        return (
          <div className="info-content">
            <div className="info-icon">ℹ️</div>
            <div className="info-message">{content.message}</div>
          </div>
        );
      
      case 'custom':
        return content.component;
      
      default:
        return <div>{content.message || 'No content available'}</div>;
    }
  };

  const renderFormField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select name={field.name} required={field.required}>
            <option value="">Select {field.label}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={field.name}
            />
            {field.label}
          </label>
        );
      
      default:
        return <input type="text" name={field.name} />;
    }
  };

  const handleActionClick = (action: any) => {
    if (action.strategy) {
      executeStrategy(action.strategy, action.data, config.id);
    } else {
      onAction(action.id, action.data);
    }
  };

  const getButtonVariantClass = (variant: string) => {
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      danger: 'btn-danger',
      ghost: 'btn-ghost'
    };
    return variants[variant as keyof typeof variants] || 'btn-primary';
  };

  return (
    <div className="modal-content">
      <div className="modal-body">
        {renderContent()}
      </div>
      
      {actions.length > 0 && (
        <div className="modal-footer">
          {actions.map(action => (
            <button
              key={action.id}
              className={`btn ${getButtonVariantClass(action.variant)}`}
              onClick={() => handleActionClick(action)}
              disabled={action.disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemaRenderer;