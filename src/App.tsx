import React from 'react';
import Grid from './Grid';
import './Grid.css';
import './App.css';


const App: React.FC = () => {
  return (
    <>
    <div className="App">
      <h1 className='center'>Cell Growth Simulation</h1>
      <Grid />
    </div>
    </>
  );
};

export default App;
