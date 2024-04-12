import React, { useState, useEffect } from 'react';
import './Location.css';
import Button from 'react-bootstrap/Button';

function Location({ onSave }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [graphContainerDimensions, setGraphContainerDimensions] = useState({ width: 0, height: 0 });
  const [containerVisible, setContainerVisible] = useState(true);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    updateCursorPosition(event);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      updateCursorPosition(event);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCursorPosition = (event) => {
    const rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    setCursorPosition({ x, y });
    onSave({ x, y }); // Automatically save the cursor position

    // Delay closing the location popup by 2 seconds (adjust as needed)
    setTimeout(() => {
      setContainerVisible(false); // Close the location popup
    }, 1000);
  };

  useEffect(() => {
    const graphContainer = document.getElementById("graph-container");
    const rect = graphContainer.getBoundingClientRect();
    setGraphContainerDimensions({ width: rect.width, height: rect.height });
  
    // Calculate the initial position of the cursor to the middle of the graph container
    setCursorPosition({ x: rect.width / 2, y: rect.height / 2 });
    onSave({ x: rect.width / 2, y: rect.height / 2 }); // Automatically save the initial position
  
  }, []);

  return (
    <div>
      {containerVisible && (
        <div className="popup" id="graphPopup">
          <div
            id="graph-container"
            style={{ backgroundImage: `url('Video/gr.jpg')` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="cursor"
              id="cursor"
              style={{ left: cursorPosition.x, top: cursorPosition.y }}
            ></div>
          </div>
          <div className="cursor-info" id="cursorInfo">
            <input
              type="text"
              value={`x: ${cursorPosition.x.toFixed(2)}, y: ${cursorPosition.y.toFixed(2)}`}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
