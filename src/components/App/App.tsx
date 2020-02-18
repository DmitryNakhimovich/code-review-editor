import React from 'react';
import './App.scss';
import { Posts } from '../Posts';

export const App = () => {
  return (
    <div className="App">
      <main>
        <h2>Test data</h2>
        <Posts />
      </main>
    </div>
  );
};
