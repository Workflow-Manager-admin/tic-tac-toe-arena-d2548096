import React, { useState, useEffect } from 'react';
import './App.css';

// Figma JSON reference
const FIGMA_JSON_PATH = 'attachment/figma_12.json';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  const [figmaData, setFigmaData] = useState(null);

  // Effect to load Figma data
  useEffect(() => {
    fetch(FIGMA_JSON_PATH)
      .then(response => response.json())
      .then(data => setFigmaData(data))
      .catch(error => console.error('Error loading Figma data:', error));
  }, []);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <h1>Tic Tac Toe</h1>
        </div>
        <div className="game-container">
          {figmaData && (
            <div className="figma-loaded">
              Game board will be rendered here using Figma data
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
