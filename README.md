# React Gift Spinner

A customizable and interactive prize wheel/spinner component for React applications. Designed for giveaways, games, promotions, and interactive user experiences.

![React Gift Spinner](./spinner.png)

## Features

- Interactive spinning wheel with smooth animations
- Fully customizable colors, labels, and icons
- Probability-based prize selection
- Responsive design for mobile and desktop
- Support for custom prize data
- TypeScript support with full type definitions
- Callback functionality when prize is selected
- Unique prefixed class names to avoid conflicts

## Installation

```bash
npm install react-gift-spinner
# or
yarn add react-gift-spinner
```

## Quick Start

```jsx
import React, { useState } from 'react';
import { GiftSpinner } from 'react-gift-spinner';
import 'react-gift-spinner/dist/esm/lib/GiftSpinner.css'; // Import the styles

function App() {
  const [prize, setPrize] = useState(null);
  
  const handlePrizeSelected = (selectedPrize) => {
    setPrize(selectedPrize);
    console.log('Selected prize:', selectedPrize);
  };

  return (
    <div className="app">
      <h1>Spin to Win!</h1>
      
      <GiftSpinner onPrizeSelected={handlePrizeSelected} />
      
      {prize && (
        <div className="winning-message">
          <p>Congratulations! You won: {prize.icon} {prize.label}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Custom Prizes

You can provide your own custom prizes with different probabilities:

```jsx
import React from 'react';
import { GiftSpinner } from 'react-gift-spinner';
import 'react-gift-spinner/dist/esm/lib/GiftSpinner.css';

const customPrizes = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 0.05  // 5% chance
  },
  { 
    label: "Car", 
    color: "#651fff",
    icon: "🚗",
    probability: 0.01  // 1% chance (rare)
  },
  { 
    label: "500 Points", 
    color: "#3d5afe",
    icon: "💎",
    probability: 0.15  // 15% chance
  },
  // Additional prizes...
];

function App() {
  return <GiftSpinner customPrizes={customPrizes} />;
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customPrizes` | `PrizeItem[]` | `defaultPrizes` | Array of prize objects |
| `onPrizeSelected` | `(prize: PrizeItem) => void` | `undefined` | Callback function when a prize is selected |
| `className` | `string` | `''` | Additional CSS class for styling |

### PrizeItem Interface

```typescript
interface PrizeItem {
  label: string;        // Text to display on the wheel
  color: string;        // Background color (hex, rgb, etc.)
  icon: string | React.ReactNode; // Emoji, URL to image, or React component
  probability: number;  // Probability weight (0 to 1)
}
```

## CSS Classes

All CSS classes in this component are prefixed with `rgp-` to avoid conflicts with your existing styles. Key classes include:

- `rgp-gift-spinner-container` - Main container
- `rgp-wheel-container` - Wheel wrapper 
- `rgp-wheel` - The spinning wheel itself
- `rgp-segment` - Individual wheel segments
- `rgp-center-button` - Center spin button
- `rgp-indicator` - Arrow indicator 

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Development

To run the project locally:

1. Clone this repo
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Building

```bash
npm run build
```

## License

MIT © Alireza Azizi
