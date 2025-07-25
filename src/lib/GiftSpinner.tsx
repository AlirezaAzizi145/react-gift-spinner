import React, { useState, useRef } from 'react';
import './GiftSpinner.css';

export interface PrizeItem {
  label: string;
  color: string;
  icon: string | React.ReactNode;
  /**
   * Percentage chance for this prize (e.g. 10 means 10%, 0.5 means 0.5%)
   */
  probability: number;
}

export interface GiftSpinnerProps {
  /**
   * Callback function called when a prize is selected
   */
  onPrizeSelected?: (prize: PrizeItem) => void;
  
  /**
   * Custom prizes to use instead of the default prizes
   */
  customPrizes?: PrizeItem[];
  
  /**
   * Optional CSS class for additional styling
   */
  className?: string;
}

// Default prizes with icons/images and probabilities
export const defaultPrizes: PrizeItem[] = [
  { 
    label: "1000 Points", 
    color: "#ff4081",
    icon: "🏆",
    probability: 5  // 5% chance
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
    probability: 100  // 100% chance
  }
];

/**
 * A customizable spinning wheel component for prize giveaways
 */
export const GiftSpinner: React.FC<GiftSpinnerProps> = ({
  onPrizeSelected,
  customPrizes,
  className = '',
}) => {
  const wheelRef = useRef<SVGSVGElement>(null);
  const [key, setKey] = useState<number>(0); // Key for forcing re-render
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedPrize, setSelectedPrize] = useState<PrizeItem | null>(null);
  
  // Use custom prizes if provided, otherwise use default prizes
  const spinnerPrizes = customPrizes || defaultPrizes;
  
  // Function to select a prize based on probability weights
  const selectPrizeByProbability = (): { prize: PrizeItem; index: number } => {
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
    // Convert percentage values to decimal (divide by 100)
    const totalProbability = availablePrizes.reduce(
      (sum, prize) => sum + ((prize.probability || 0) / 100), 0
    );
    
    // Create probability ranges for selection
    let cumulativeProbability = 0;
    const probabilityRanges = availablePrizes.map(prize => {
      // Convert percentage to decimal
      const normalizedProbability = ((prize.probability || 0) / 100) / totalProbability;
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
    ) || probabilityRanges[0]; // Fallback to first prize if no match (shouldn't happen)
    
    // Find the original index in spinnerPrizes array
    const index = spinnerPrizes.findIndex(prize => prize.label === selectedRange.prize.label);
    
    console.log("Selected prize:", selectedRange.prize.label, "at index:", index);
    return { prize: selectedRange.prize, index };
  };
  
  const spinWheel = (): void => {
    if (spinning) return;
    
    setSpinning(true);
    setSelectedPrize(null);
    
    // Increment key to force re-render and reset animation state
    setKey(prevKey => prevKey + 1);
    
    // Select a prize based on probability weights
    const { prize: selectedPrize, index: selectedIndex } = selectPrizeByProbability();
    
    console.log("Selected index:", selectedIndex, "Prize:", selectedPrize.label);
    
    // Calculate degrees per segment
    const segmentAngle = 360 / spinnerPrizes.length; 
    
    // Add a small random offset within the segment (0-80% of segment width) 
    // to avoid always landing on exact center of segment
    const randomOffset = Math.random() * (segmentAngle * 0.8);
    
    // Calculate the correct rotation to land on the selected prize
    // The wheel rotates clockwise, so we need to calculate the opposite position
    const landingPosition = 360 - ((selectedIndex * segmentAngle) + randomOffset);
    
    // Ensure exactly 3 full rotations (1080 degrees) plus the position for the selected prize
    const totalRotation = 1080 + landingPosition;
    
    console.log("Landing position:", landingPosition, "Total rotation:", totalRotation);
    
    // Apply the rotation after a short delay to ensure rendering cycle is complete
    if (wheelRef.current) {
      // Force reflow before applying new rotation
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(0deg)`;
      // Use type assertion to access offsetHeight
      void (wheelRef.current as unknown as HTMLElement).offsetHeight; // Force reflow
      
      // Apply new rotation with transition
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.15, 0.99)';
          wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
        }
      }, 10);
    }
    
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
  const renderIcon = (prize: PrizeItem, x: number, y: number): React.ReactNode => {
    // Fixed icon size to match original UI
    const iconSize = 16;
    const halfIconSize = iconSize / 2;
    
    // Check if the icon is a string (emoji or image URL)
    if (typeof prize.icon === 'string') {
      // Check if the icon is an image URL
      if (prize.icon.startsWith('http') || prize.icon.startsWith('data:')) {
        return (
          <image 
            href={prize.icon} 
            x={x - halfIconSize} 
            y={y - halfIconSize} 
            width={iconSize} 
            height={iconSize}
          />
        );
      }
      // Otherwise, render as text (emoji or text icon)
      return (
        <text 
          x={x} 
          y={y - halfIconSize + 4} 
          fill="white" 
          fontSize={iconSize} 
          textAnchor="middle"
        >
          {prize.icon}
        </text>
      );
    }
    
    // If it's a React node, render it within a foreignObject (for custom React components)
    return (
      <foreignObject x={x - halfIconSize} y={y - halfIconSize} width={iconSize} height={iconSize}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {prize.icon}
        </div>
      </foreignObject>
    );
  };

  // Create segments using SVG paths
  const createSegments = (): React.ReactNode[] => {
    const segments: React.ReactNode[] = [];
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    
    // Calculate angle per segment based on number of prizes
    const totalPrizes = spinnerPrizes.length;
    const anglePerSegment = 360 / totalPrizes;
    
    spinnerPrizes.forEach((prize, index) => {
      const startAngle = index * anglePerSegment; // Dynamic angle per segment
      const endAngle = (index + 1) * anglePerSegment;
      
      // Convert angles to radians for SVG path calculation
      const startRad = (startAngle - 90) * Math.PI / 180; // -90 to start at top
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      // Calculate points on the circle
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Create path for the segment
      // Use largeArcFlag 1 if angle > 180 degrees
      const largeArcFlag = anglePerSegment > 180 ? 1 : 0;
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      // Calculate position for the text and icon
      const textAngle = (startAngle + endAngle) / 2 - 90; // Average angle, adjusted to start from top
      const textRad = textAngle * Math.PI / 180;
      
      // Fixed position ratios to match the original UI
      // Text positioned at 75% of radius from center
      const textRadius = radius * 0.75; 
      const textX = centerX + textRadius * Math.cos(textRad);
      const textY = centerY + textRadius * Math.sin(textRad);
      
      // Icons positioned at 55% of radius from center
      const iconRadius = radius * 0.55;
      const iconX = centerX + iconRadius * Math.cos(textRad);
      const iconY = centerY + iconRadius * Math.sin(textRad);
      
      // Create text rotation
      const textRotation = textAngle + 90; // Adjust text rotation so it's radial
      const iconRotation = textRotation; // Same rotation for icon
      
      // Fixed font size to match original UI
      const fontSize = 10;
      
      segments.push(
        <g key={index}>
          <path
            d={path}
            fill={prize.color}
            className={selectedPrize && selectedPrize.label === prize.label ? 'rgp-segment rgp-highlighted' : 'rgp-segment'}
            style={{
              opacity: prize.probability === 0 ? 0.3 : 1 // Dim segments with zero probability
            }}
          />
          
          {/* Prize label */}
          <text
            x={textX}
            y={textY}
            fill="white"
            fontSize={fontSize}
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
    <div className={`rgp-gift-spinner-container ${className}`.trim()}>
      {/* Wheel container with the indicator arrow inside it */}
      <div className="rgp-wheel-container">
        {/* Animated glowing background circle */}
        <div className="rgp-wheel-background"></div>
        
        {/* Green triangle pointer */}
        <div className="rgp-indicator">
          <div className="rgp-arrow"></div>
        </div>
        
        <svg 
          key={key} // Use key to force re-render
          ref={wheelRef}
          className="rgp-wheel"
          width="300" 
          height="300" 
          viewBox="0 0 300 300"
        >
          {createSegments()}
        </svg>
        
        {/* Add a stationary center button */}
        <div className="rgp-center-button">
          <div className="rgp-spin-text">spin</div>
        </div>
        
        {/* Make the wheel interactive */}
        <div 
          className="rgp-spin-button-overlay"
          onClick={spinWheel}
          style={{
            cursor: spinning ? 'not-allowed' : 'pointer'
          }}
        />
      </div>
    </div>
  );
};

export default GiftSpinner;