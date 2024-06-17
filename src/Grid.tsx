import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Grid.css';
import GrowthChart from './GrowthChart';

const Grid: React.FC = () => {
    const [occupancyPercentage, setOccupancyPercentage] = useState<number>(20); // Default to 20%

    const generateInitialGrid = (percentage: number): boolean[][] => {
        const grid: boolean[][] = [];
        for (let i = 0; i < 20; i++) {
            const row: boolean[] = [];
            for (let j = 0; j < 20; j++) {
                row.push(Math.random() < (percentage / 100));
            }
            grid.push(row);
        }
        return grid;
    };

    const [grid, setGrid] = useState<boolean[][]>(generateInitialGrid(occupancyPercentage));
    const [expanding, setExpanding] = useState<boolean>(false);
    const [timerInSeconds, setTimerInSeconds] = useState<number>(2);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [paused, setPaused] = useState<boolean>(true);
    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [growthData, setGrowthData] = useState<number[]>([]);
    const [timeLabels, setTimeLabels] = useState<number[]>([]);

    const countOccupiedCells = (grid: boolean[][]): number => {
        return grid.flat().filter(cell => cell).length;
    };

    useEffect(() => {
        const expandDots = () => {
            if (!paused) {
                setGrid(prevGrid => {
                    const newGrid = prevGrid.map(row => [...row]);
                    for (let rowIndex = 0; rowIndex < prevGrid.length; rowIndex++) {
                        for (let colIndex = 0; colIndex < prevGrid[rowIndex].length; colIndex++) {
                            if (prevGrid[rowIndex][colIndex]) {
                                const directions = [
                                    [-1, 0], [1, 0], [0, -1], [0, 1]
                                ];
                                for (const [rOffset, cOffset] of directions) {
                                    const r = rowIndex + rOffset;
                                    const c = colIndex + cOffset;
                                    if (r >= 0 && r < 20 && c >= 0 && c < 20 && !prevGrid[r][c]) {
                                        newGrid[r][c] = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    const occupiedCells = countOccupiedCells(newGrid);
                    setGrowthData(prevGrowthData => [...prevGrowthData, occupiedCells]);
                    setTimeLabels(prevTimeLabels => [...prevTimeLabels, (prevTimeLabels.length + 1) * timerInSeconds]);
                    return newGrid;
                });
            }
        };

        if (expanding && !paused && !intervalId) {
            const id = setInterval(expandDots, timerInSeconds * 1000);
            setIntervalId(id);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };
    }, [expanding, paused, timerInSeconds, intervalId]);

    const handleStartPause = () => {
        if (paused) {
            setExpanding(true);
            setPaused(false);
            setHasStarted(true);
            setActiveButton('start-pause');
        } else {
            setPaused(true);
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            setActiveButton('start-pause');
        }
    };

    const handleReset = () => {
        setGrid(generateInitialGrid(occupancyPercentage));
        setExpanding(false);
        setPaused(true);
        setHasStarted(false);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setActiveButton('reset');
        setGrowthData([]);
        setTimeLabels([]);
    };

    const handleTimerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimerInSeconds(Number(event.target.value));
    };

    const handleOccupancyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPercentage = Number(event.target.value);
        setOccupancyPercentage(newPercentage);
        setGrid(generateInitialGrid(newPercentage));
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (!expanding && paused) {
            const updatedGrid = [...grid];
            updatedGrid[rowIndex][colIndex] = !updatedGrid[rowIndex][colIndex];
            setGrid(updatedGrid);
        }
    };

    return (
        <div className="container">
            <div className="grid-chart-container">
                <div className="grid-container">
                    <div className="grid">
                        {grid.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((isOccupied, colIndex) => (
                                    <Cell
                                        key={colIndex}
                                        isOccupied={isOccupied}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chart-container">
                    <GrowthChart growthData={growthData} timeLabels={timeLabels} />
                    <div className="controls-container">
                        <div className="timer-container">
                            <label htmlFor="timer">Timer(sec)</label>
                            <input
                                type="number"
                                id="timer"
                                value={timerInSeconds}
                                onChange={handleTimerChange}
                                disabled={hasStarted} // Disabled when the simulation has started
                                min="1"
                                step="1"
                            />
                        </div>
                        <div className="occupancy-container">
                            <label htmlFor="occupancy">Initial Occupancy (%)</label>
                            <input
                                type="number"
                                id="occupancy"
                                value={occupancyPercentage}
                                onChange={handleOccupancyChange}
                                disabled={hasStarted} // Disabled when the simulation has started
                                min="0"
                                max="100"
                                step="1"
                            />
                        </div>
                        <div className="button-container">
                            <button
                                className={`control-button start-pause-button ${activeButton === 'start-pause' ? 'active' : ''} ${paused ? 'start' : 'pause'}`}
                                onClick={handleStartPause}
                            >
                                {paused ? 'Start' : 'Pause'}
                            </button>
                            <button
                                className={`control-button reset-button ${activeButton === 'reset' ? 'active' : ''}`}
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grid;

export{};