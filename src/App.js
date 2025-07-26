import './App.css';
// Import from local files instead of the installed package
import { GiftSpinner } from './lib/index';
import { useState } from 'react';
// With prefixed class names, we don't need to import the CSS separately - it's included in the component

// Single array of prizes that we can modify for testing by adding/removing items
const customPrizes = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 10  // 10% chance
  },
  { 
    label: "LEXUS LS-2019", 
    color: "#651fff",
    icon: "🚗",
    probability: 0.5  // 0.5% chance (rare)
  },
  { 
    label: "500 Points", 
    color: "#3d5afe",
    icon: "💎",
    probability: 15  // 15% chance
  },
  { 
    label: "Golden Race", 
    color: "#2979ff",
    icon: "🏁",
    probability: 10  // 10% chance
  },
  { 
    label: "250 Points", 
    color: "#00b0ff",
    icon: "🎖️",
    probability: 30  // 30% chance (common)
  },
 
  
];

function App() {
  const [winningPrize, setWinningPrize] = useState(null);
  
  const handlePrizeSelected = (prize) => {
    console.log('Selected prize:', prize);
    setWinningPrize(prize);
  };

  return (
    <div className="App">
      <div className="app-content">
        <div className="app-header">
          <div className="gift-icon">🎁</div>
          <h1>Spin to Win</h1>
        
          {winningPrize && (
            <div className="winning-message">
              <p>Congratulations! You won: {winningPrize.icon} {winningPrize.label}</p>
            </div>
          )}
        </div>
        
        <div className="app-spinner">
          <GiftSpinner 
            onPrizeSelected={handlePrizeSelected} 
            customPrizes={customPrizes} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
