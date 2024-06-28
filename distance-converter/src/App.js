import React, { useState } from 'react';

const units = {
  centimeters: 0.01,
  inches: 0.0254,
  miles: 1609.34,
  feet: 0.3048,
  kilometers: 1000,
  meters: 1
};

const App = () => {
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('meters');
  const [fromValue, setFromValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleConvert = () => {
    const valueInMeters = parseFloat(fromValue) * units[fromUnit];
    const convertedValue = valueInMeters / units[toUnit];
    setOutputValue(convertedValue.toFixed(6)); // Display up to 6 decimal places
  };

  return (


    <div className=''>
      <h1>Distance Converter</h1>
      <div>
        <label htmlFor="fromUnit">From:</label>
        <select id="fromUnit" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="toUnit">To:</label>
        <select id="toUnit" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="fromValue">Value:</label>
        <input
          type="number"
          id="fromValue"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          />
      </div>
      <button id="convert" onClick={handleConvert}>Convert</button>
      <div id="outputvalue">Result: {outputValue}</div>
    </div>

  );
};

export default App;
