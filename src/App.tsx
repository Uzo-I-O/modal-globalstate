import React, { useState } from 'react';
import './App.css';
import './components/modals/Modal.css';
import { ModalRoot } from './components/modals';
import { DemoPage1, DemoPage2, DemoPage3 } from './components/demo';
import { useModalActions } from './store';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const { openModal, closeAllModals } = useModalActions();

  const tabs = [
    { name: 'User Management', component: <DemoPage1 /> },
    { name: 'Business Operations', component: <DemoPage2 /> },
    { name: 'Advanced Features', component: <DemoPage3 /> },
  ];

  const openWelcomeModal = () => {
    openModal({
      type: 'info',
      title: 'Welcome to Modal Global State Demo',
      size: 'large',
      data: {
        message: `
          Welcome to the Global Modal State Management System!
          
          This demo showcases:
          • Zustand-powered global state store
          • Reusable modal components with registry system
          • Strategy pattern for modal actions
          • Schema-based modal rendering
          • Multiple modal types and sizes
          • Modal stacking and chaining
          
          Navigate through the tabs to explore different modal scenarios.
        `
      }
    });
  };

  return (
    <div className="App">
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>
          🎭 Global Modal State Store
        </h1>
        <p style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', opacity: 0.9 }}>
          Zustand + Registry + Strategy Pattern Demo
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={openWelcomeModal}
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            Show Welcome Modal
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={closeAllModals}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            Close All Modals
          </button>
        </div>
      </header>

      <nav className="nav-tabs" style={{ background: '#f8f9fa', padding: '0 2rem' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`nav-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <main style={{ minHeight: 'calc(100vh - 200px)', background: '#f8f9fa' }}>
        {tabs[activeTab].component}
      </main>

      <footer style={{ 
        background: '#343a40', 
        color: 'white', 
        padding: '1rem', 
        textAlign: 'center' 
      }}>
        <p style={{ margin: 0 }}>
          Built with React + TypeScript + Zustand | 
          Features: Modal Registry, Strategy Pattern, Schema Rendering
        </p>
      </footer>

      {/* Modal Root - renders all modals */}
      <ModalRoot />
    </div>
  );
}

export default App;
