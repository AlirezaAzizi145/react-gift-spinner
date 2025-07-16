import './App.css';
import GiftSpinner from './components/GiftSpinner';
import { useState } from 'react';

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
        </div>
        
        <div className="app-spinner">
          <GiftSpinner onPrizeSelected={handlePrizeSelected} />
        </div>
      </div>
    </div>
  );
}

export default App;
