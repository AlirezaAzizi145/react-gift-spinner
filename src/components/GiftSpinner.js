import React, { useState } from 'react';
import './GiftSpinner.css';

// Default prizes with icons/images and probabilities
const prizes = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 0.05  // 5% chance
  },
  { 
    label: "LEXUS LS-2019", 
    color: "#651fff",
    icon: "🚗",
    probability: 0  // 0% chance
  },
  { 
    label: "500 Points", 
    color: "#3d5afe",
    icon: "💎",
    probability: 0  // 0% chance
  },
  { 
    label: "Golden Race", 
    color: "#2979ff",
    icon: "🏁",
    probability: 0  // 0% chance
  },
  { 
    label: "250 Points", 
    color: "#00b0ff",
    icon: "🎖️",
    probability: 0  // 0% chance
  },
  { 
    label: "Best Player", 
    color: "#311b92",
    icon: "👑",
    probability: 0  // 0% chance
  },
  { 
    label: "Great Prize", 
    color: "#4527a0",
    icon: "🎁",
    probability: 0  // 0% chance
  },
  { 
    label: "NULL Prize", 
    color: "#512da8",
    icon: "❌",
    probability: 1  // 100% chance
  }
];

const GiftSpinner = ({ onPrizeSelected, customPrizes }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  
  // Use custom prizes if provided, otherwise use default prizes
  const spinnerPrizes = customPrizes || prizes;
  
  // Function to select a prize based on probability weights
  const selectPrizeByProbability = () => {
    // Filter out prizes with 0 probability
    const availablePrizes = spinnerPrizes.filter(prize => 
      prize.probability !== undefined && prize.probability > 0
    );
    
    // If no valid prizes, return a random prize
    if (availablePrizes.length === 0) {
      console.log("No prizes with probability > 0, selecting random prize");
      const randomIndex = Math.floor(Math.random() * spinnerPrizes.length);
      return {
        prize: spinnerPrizes[randomIndex],
        index: randomIndex
      };
    }
    
    // Normalize probabilities to ensure they sum to 1
    const totalProbability = availablePrizes.reduce(
      (sum, prize) => sum + (prize.probability || 0), 0
    );
    
    // Create probability ranges for selection
    let cumulativeProbability = 0;
    const probabilityRanges = availablePrizes.map(prize => {
      const normalizedProbability = (prize.probability || 0) / totalProbability;
      const range = {
        prize,
        start: cumulativeProbability,
        end: cumulativeProbability + normalizedProbability
      };
      cumulativeProbability += normalizedProbability;
      return range;
    });
    
    // Generate a random number between 0 and 1
    const random = Math.random();
    
    // Find the prize that matches the random number
    const selectedRange = probabilityRanges.find(
      range => random >= range.start && random < range.end
    );
    
    // Find the original index in spinnerPrizes array
    const index = spinnerPrizes.findIndex(prize => prize.label === selectedRange.prize.label);
    
    console.log("Selected prize:", selectedRange.prize.label, "at index:", index);
    return { prize: selectedRange.prize, index };
  };
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setSelectedPrize(null);
    
    // Select a prize based on probability weights
    const { prize: selectedPrize, index: selectedIndex } = selectPrizeByProbability();
    
    console.log("Selected index:", selectedIndex, "Prize:", selectedPrize.label);
    
    // Calculate degrees per segment
    const segmentAngle = 360 / spinnerPrizes.length; // 45 degrees for 8 segments
    
    // Add a small random offset within the segment (0-80% of segment width) 
    // to avoid always landing on exact center of segment
    const randomOffset = Math.random() * (segmentAngle * 0.8);
    
    // CRITICAL FIX: Calculate the correct rotation to land on the selected prize
    // The wheel rotates clockwise, so we need to calculate the opposite position
    // Each segment is 45 degrees (for 8 segments)
    // To land on segment N, we need to rotate to 360 - (N * 45) degrees
    // Then adjust for the random offset
    const landingPosition = 360 - ((selectedIndex * segmentAngle) + randomOffset);
    
    // Ensure at least 3 full rotations (1080 degrees) plus the position for the selected prize
    const minRotations = 1080; // At least 3 full rotations
    const extraRotations = Math.floor(Math.random() * 3) * 360; // 0-2 extra rotations
    
    const totalRotation = minRotations + extraRotations + landingPosition;
    
    console.log("Landing position:", landingPosition, "Total rotation:", totalRotation);
    
    setRotation(totalRotation);
    
    // Set the selected prize after animation completes
    setTimeout(() => {
      setSelectedPrize(selectedPrize);
      setSpinning(false);
      
      if (onPrizeSelected) {
        onPrizeSelected(selectedPrize);
      }
    }, 3000); // Match this with the CSS animation duration
  };

  // Helper function to render icon/image
  const renderIcon = (prize, x, y) => {
    // Check if the icon is an image URL (string starting with http or data:)
    if (typeof prize.icon === 'string' && (prize.icon.startsWith('http') || prize.icon.startsWith('data:'))) {
      return (
        <image 
          href={prize.icon} 
          x={x - 10} 
          y={y - 15} 
          width="20" 
          height="20"
        />
      );
    }
    // Otherwise, render as text (emoji or text icon)
    return (
      <text 
        x={x} 
        y={y - 12} 
        fill="white" 
        fontSize="16" 
        textAnchor="middle"
      >
        {prize.icon}
      </text>
    );
  };

  // Create segments using SVG paths
  const createSegments = () => {
    const segments = [];
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    
    spinnerPrizes.forEach((prize, index) => {
      const startAngle = index * 45; // 45 degrees per segment
      const endAngle = (index + 1) * 45;
      
      // Convert angles to radians for SVG path calculation
      const startRad = (startAngle - 90) * Math.PI / 180; // -90 to start at top
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      // Calculate points on the circle
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Create path for the segment
      const largeArcFlag = 0; // 0 for arcs less than 180 degrees
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      // Calculate position for the text and icon
      const textAngle = (startAngle + endAngle) / 2 - 90; // Average angle, adjusted to start from top
      const textRad = textAngle * Math.PI / 180;
      
      // Position text farther out from center
      const textRadius = radius * 0.65; // Position text at 65% of radius
      const textX = centerX + textRadius * Math.cos(textRad);
      const textY = centerY + textRadius * Math.sin(textRad);
      
      // Position icon closer to center
      const iconRadius = radius * 0.4; // Position icon at 40% of radius
      const iconX = centerX + iconRadius * Math.cos(textRad);
      const iconY = centerY + iconRadius * Math.sin(textRad);
      
      // Create text rotation
      const textRotation = textAngle + 90; // Adjust text rotation so it's radial
      const iconRotation = textRotation; // Same rotation for icon
      
      segments.push(
        <g key={index}>
          <path
            d={path}
            fill={prize.color}
            className={selectedPrize && selectedPrize.label === prize.label ? 'segment highlighted' : 'segment'}
            style={{
              opacity: prize.probability === 0 ? 0.3 : 1 // Dim segments with zero probability
            }}
          />
          
          {/* Prize label */}
          <text
            x={textX}
            y={textY}
            fill="white"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {prize.label}
          </text>
          
          {/* Prize icon/image */}
          <g transform={`rotate(${iconRotation}, ${iconX}, ${iconY})`}>
            {prize.icon && renderIcon(prize, iconX, iconY)}
          </g>
        </g>
      );
    });
    
    return segments;
  };

  return (
    <div className="gift-spinner-container">
      {/* Green triangle pointer */}
      <div className="indicator">
        <div className="arrow"></div>
      </div>
      
      {/* Spinner wheel */}
      <div className="wheel-container">
        <svg 
          className={`wheel ${spinning ? 'spinning' : ''}`}
          width="300" 
          height="300" 
          viewBox="0 0 300 300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {createSegments()}
          
          {/* Remove center circle from rotating part */}
        </svg>
        
        {/* Add a stationary center button */}
        <div className="center-button">
          <div className="spin-text">spin</div>
        </div>
        
        {/* Make the wheel interactive */}
        <div 
          className="spin-button-overlay"
          onClick={spinWheel}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            cursor: spinning ? 'not-allowed' : 'pointer',
            zIndex: 10
          }}
        />
      </div>
    </div>
  );
};

export default GiftSpinner; 