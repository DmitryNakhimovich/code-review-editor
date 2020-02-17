import React from 'react';
import './App.scss';
import { Posts } from '../Posts';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <h2>Test data</h2>
        <Posts />
      </main>
    </div>
  );
};

export default App;
