import './App.css';
// Import from local files instead of the installed package
import { GiftSpinner } from './lib/index';
import { useState } from 'react';
// With prefixed class names, we don't need to import the CSS separately - it's included in the component

// Example of custom prizes with 6 items
const sixPrizes = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 20  // 20% chance
  },
  { 
    label: "LEXUS LS-2019", 
    color: "#651fff",
    icon: "🚗",
    probability: 5  // 5% chance
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
    probability: 20  // 20% chance
  },
  { 
    label: "250 Points", 
    color: "#00b0ff",
    icon: "🎖️",
    probability: 30  // 30% chance
  },
  { 
    label: "Best Player", 
    color: "#311b92",
    icon: "👑",
    probability: 10  // 10% chance
  }
];

// Example of custom prizes with 8 items (default)
const eightPrizes = [
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
  { 
    label: "Best Player", 
    color: "#311b92",
    icon: "👑",
    probability: 4  // 4% chance
  },
  { 
    label: "Great Prize", 
    color: "#4527a0",
    icon: "🎁",
    probability: 15  // 15% chance
  },
  { 
    label: "NULL Prize", 
    color: "#512da8",
    icon: "❌",
    probability: 0  // 0% chance - will never be selected
  }
];

// Example of custom prizes with 10 items
const tenPrizes = [
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
    probability: 10  // 10% chance
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
    probability: 20  // 20% chance
  },
  { 
    label: "Best Player", 
    color: "#311b92",
    icon: "👑",
    probability: 4  // 4% chance
  },
  { 
    label: "Great Prize", 
    color: "#4527a0",
    icon: "🎁",
    probability: 10  // 10% chance
  },
  { 
    label: "NULL Prize", 
    color: "#512da8",
    icon: "❌",
    probability: 0.5  // 0.5% chance
  },
  { 
    label: "Mystery Box", 
    color: "#e91e63",
    icon: "❓",
    probability: 15  // 15% chance
  },
  { 
    label: "Free Spin", 
    color: "#009688",
    icon: "🔄",
    probability: 20  // 20% chance
  }
];

function App() {
  const [winningPrize, setWinningPrize] = useState(null);
  const [prizeCount, setPrizeCount] = useState(8); // Default to 8 prizes
  
  const handlePrizeSelected = (prize) => {
    console.log('Selected prize:', prize);
    setWinningPrize(prize);
  };

  // Get the appropriate prize set based on the selected count
  const getPrizes = () => {
    switch(prizeCount) {
      case 6: return sixPrizes;
      case 10: return tenPrizes;
      case 8:
      default: return eightPrizes;
    }
  };

  return (
    <div className="App">
      <div className="app-content">
        <div className="app-header">
          <div className="gift-icon">🎁</div>
          <h1>Spin to Win</h1>
          
          <div className="prize-count-selector">
            <button 
              onClick={() => setPrizeCount(6)} 
              className={prizeCount === 6 ? 'active' : ''}
            >
              6 Prizes
            </button>
            <button 
              onClick={() => setPrizeCount(8)} 
              className={prizeCount === 8 ? 'active' : ''}
            >
              8 Prizes
            </button>
            <button 
              onClick={() => setPrizeCount(10)} 
              className={prizeCount === 10 ? 'active' : ''}
            >
              10 Prizes
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
            customPrizes={getPrizes()} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
