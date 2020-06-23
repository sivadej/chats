import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Store from './Store';

function App() {
  return (
    <div>
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
