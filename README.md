Bacterial Cell Growth Simulation Overview:

This project simulates the growth of bacterial colony where users can visualize how bacteria cells divide and spread within a confined grid over time. The main features of this project include:

1. Grid Visualization: A 20x20 grid where cells can be either occupied by bacteria or empty.
2. Interactive Controls: Users can set the initial occupancy percentage, adjust the timer interval for growth, adjust the grid size and manually and add or remove bacteria by clicking on cells.
3. Growth Simulation: The bacteria is spread to adjacent cells at each timer interval, mimicking bacterial growth.
4. Growth Chart: A dynamic chart that plots the number of occupied cells over time, providing a visual representation of the bacterial growth rate.

Instructions for Setting Up and Running the Project Locally:

Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) 

Installation

1. Clone the Repository:

    https://github.com/aiswaryapoosarla/Cell_Growth_Simulation.git   
    cd Cell_Growth_Simulation

2. Install Dependencies:
   npm install
   
3. Start the Development Server:
   npm start
   
5. Open the Application:
   Open your web browser and navigate to `http://localhost:3000`.

Using the Application:

Upon accessing http://localhost:3000, interact with the simulation:

- Adjust initial settings (occupancy percentage, timer interval, grid size).
- Click cells to toggle occupancy manually.
- Start, pause, or reset the simulation as needed.
- Monitor bacterial growth via real-time charts.
- Experiment with settings for different growth scenarios.

Project Structure and Key Components:
1. Grid.tsx:
   - Manages the grid state and the simulation logic.
   - Contains input fields where users can set the initial occupancy percentage, time interval and grid size.
   - Contains controls for starting, pausing, and resetting the simulation.
   - Generates the initial grid based on the occupancy percentage.
   - Handles the growth logic where bacteria spread to adjacent cells at each timer interval.

2. Cell.tsx:
   - Represents each cell in the grid.
   - Renders as occupied or empty based on the `isOccupied` prop.
   - Handles click events to manually toggle the cell state when the simulation is paused.

3. GrowthChart.tsx:
   - Plots the growth data on a chart.
   - Uses SVG to draw the growth curve and axes.
   - Dynamically updates as the simulation progresses.

4. App.tsx:
   - Main application component.
   - Combines the grid,cell and growth chart components.

5. Index.css and Grid.css:
   - Index.css: Global styles including background images and basic body styling.
   - Grid.css: Styles specific to grid and cell layout, ensuring proper display and visual distinction for occupied cells.

Additional Features implemented:

- Initial Occupancy Control: Users can set the initial percentage of cells that are occupied by bacteria. This feature enhances interactivity, allowing users to experiment with different starting conditions.
  
- Grid Size Control: Users can select the grid size manually, choosing between 5 and 100 cells, for greater flexibility and scalability. 

- Visual Feedback: The use of a bacteria image and a subtle vibration animation makes the occupied cells visually distinctive, enhancing the user experience.


