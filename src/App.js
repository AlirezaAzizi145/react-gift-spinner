import './App.css';
import GiftSpinner from './components/GiftSpinner';

function App() {
  const handlePrizeSelected = (prize) => {
    console.log('Selected prize:', prize);
    // You can add any prize winning logic here
  };

  return (
    <div className="App">
      <div className="App-container">
        <GiftSpinner onPrizeSelected={handlePrizeSelected} />
      </div>
    </div>
  );
}

export default App;
