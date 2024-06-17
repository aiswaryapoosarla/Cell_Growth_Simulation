//******pre-occupied percentage input - successful o/p*****/

import React from 'react';

type CellProps = {
  isOccupied: boolean;
  onClick: () => void;
};

const Cell: React.FC<CellProps> = ({ isOccupied, onClick }) => {
  return (
    <div className="cell"  onClick={onClick}>
      {/* {isOccupied ? <span className="vibrating-dot">•</span> : ''} */}
      {isOccupied ? <img src="/bacteria_image.png" alt="Bacteria" className="bacteria-image" /> : ''}
  
    </div>
  );
};

export default Cell;




