import './App.css';
import GiftSpinner from './components/GiftSpinner';
import { useState } from 'react';

// Example of custom prizes with images and probabilities
const customPrizes = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 0  // 5% chance
  },
  { 
    label: "LEXUS LS-2019", 
    color: "#651fff",
    icon: "🚗",
    probability: 0  // 1% chance (rare)
  },
  { 
    label: "500 Points", 
    color: "#3d5afe",
    icon: "💎",
    probability: 0  // 15% chance
  },
  { 
    label: "Golden Race", 
    color: "#2979ff",
    icon: "🏁",
    probability: 0.5  // 10% chance
  },
  { 
    label: "250 Points", 
    color: "#00b0ff",
    icon: "🎖️",
    probability:0.5  // 30% chance (common)
  },
  { 
    label: "Best Player", 
    color: "#311b92",
    icon: "👑",
    probability: 0  // 4% chance
  },
  { 
    label: "Great Prize", 
    color: "#4527a0",
    icon: "🎁",
    probability: 0  // 15% chance
  },
  { 
    label: "NULL Prize", 
    color: "#512da8",
    icon: "❌",
    probability: 0  // 0% chance - will never be selected
  }
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
          <div className="app-buttons">
            <button className="btn btn-primary">
              <span className="icon">▶</span> Show Ads
            </button>
            <button className="btn btn-secondary">
              <span className="coin-icon">🪙</span> 10 Coins
            </button>
          </div>
          
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
