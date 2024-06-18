import React from 'react';
import './Grid.css';

interface GrowthChartProps {
  growthData: number[];
  timeLabels: number[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ growthData, timeLabels }) => {
  const width = 900;
  const height = 300;
  const padding = 30;

  const maxTime = Math.max(...timeLabels, 1); // Ensure maxTime is not zero
  const maxGrowth = Math.max(...growthData, 1); // Ensure maxGrowth is not zero

  const xScale = (time: number) => (time / maxTime) * (width - 2 * padding) + padding;
  const yScale = (value: number) => height - padding - (value / maxGrowth) * (height - 2 * padding);

  return (
    <div className="chart-container">
      <h1 style={{fontSize:"20px"}}>Bacterial-growth-rate/Time</h1>
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke="black"
          strokeWidth="2"
          points={growthData.map((point, index) => `${xScale(index)},${yScale(point)}`).join(' ')}
        />
        {growthData.map((point, index) => (
          <circle
            key={index}
            cx={xScale(index)}
            cy={yScale(point)}
            r="3"
            fill="#2e9423"
          />
        ))}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="black" />
        {timeLabels.map((label, index) => (
          <text
            key={index}
            x={xScale(index)}
            y={height - padding + 15}
            textAnchor="middle"
            fontSize="10"
          >
            {label}
          </text>
        ))}
        {[...Array(6)].map((_, i) => (
          <text
            key={i}
            x={padding - 10}
            y={yScale((maxGrowth / 5) * i) + 3}
            textAnchor="end"
            fontSize="10"
          >
            {(maxGrowth / 5) * i}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default GrowthChart;


