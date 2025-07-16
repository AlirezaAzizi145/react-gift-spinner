import React, { useState } from 'react';
import './GiftSpinner.css';

const prizes = [
  { label: "1000 Points", color: "#ff4081" },
  { label: "LEXUS LS-2019", color: "#651fff" },
  { label: "500 Points", color: "#3d5afe" },
  { label: "Golden Race", color: "#2979ff" },
  { label: "250 Points", color: "#00b0ff" },
  { label: "Best Player", color: "#311b92" },
  { label: "Great Prize", color: "#4527a0" },
  { label: "NULL Prize", color: "#512da8" }
];

const GiftSpinner = ({ onPrizeSelected }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setSelectedPrize(null);
    
    // Generate a random rotation between 2 and 5 full rotations plus a random segment
    const segmentAngle = 45; // 360 / 8 = 45 degrees per segment
    const randomSegment = Math.floor(Math.random() * prizes.length);
    
    // Add a small random offset within the segment (0-80% of segment width) to avoid always landing on segment borders
    const randomOffset = Math.random() * (segmentAngle * 0.8);
    
    const randomDegrees = (randomSegment * segmentAngle) + randomOffset;
    // Ensure at least 2 full rotations (720 degrees) plus the random position
    const minRotations = 720;
    const extraRotations = Math.floor(Math.random() * 4) * 360; // 0-3 extra rotations
    const totalRotation = minRotations + extraRotations + randomDegrees;
    
    setRotation(totalRotation);
    
    // Calculate which prize was selected
    setTimeout(() => {
      const finalRotation = totalRotation % 360;
      // We need to convert the rotation to determine the prize
      const normalizedDegree = (360 - finalRotation) % 360;
      const selectedIndex = Math.floor(normalizedDegree / segmentAngle);
      
      setSelectedPrize(prizes[selectedIndex]);
      setSpinning(false);
      
      if (onPrizeSelected) {
        onPrizeSelected(prizes[selectedIndex]);
      }
    }, 3000); // Match this with the CSS animation duration
  };

  // Create segments using SVG paths
  const createSegments = () => {
    const segments = [];
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    
    prizes.forEach((prize, index) => {
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
      
      // Calculate position for the text
      const textAngle = (startAngle + endAngle) / 2 - 90; // Average angle, adjusted to start from top
      const textRad = textAngle * Math.PI / 180;
      const textRadius = radius * 0.65; // Position text at 65% of radius
      const textX = centerX + textRadius * Math.cos(textRad);
      const textY = centerY + textRadius * Math.sin(textRad);
      
      // Create text rotation
      const textRotation = textAngle + 90; // Adjust text rotation so it's radial
      
      segments.push(
        <g key={index}>
          <path
            d={path}
            fill={prize.color}
            className={selectedPrize && selectedPrize.label === prize.label ? 'segment highlighted' : 'segment'}
          />
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
          
          {/* Center circle */}
          <circle cx="150" cy="150" r="40" fill="#ffca28" className="wheel-center" />
          <text x="150" y="155" textAnchor="middle" fill="#333" fontWeight="bold" fontSize="14">spin</text>
        </svg>
        
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