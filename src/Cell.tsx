import React from 'react';
import './Grid.css';


interface CellProps {
    isOccupied: boolean;
    onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isOccupied, onClick }) => {
    return (
        <div
            className={`cell ${isOccupied ? 'occupied' : ''}`}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {isOccupied && (
                <img
                    src="/bacteria_image.png"
                    alt="Bacteria"
                    className="bacteria-image"
                />
            )}
        </div>
    );
};

export default Cell;


