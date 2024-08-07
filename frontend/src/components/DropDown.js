import React, {useEffect} from 'react';

export default function Dropdown({ selectedVariable, setSelectedVariable, variableList, field }) {
  const handleChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  return (
    <div className="md:text-[1.2vw] text-[3.2vw]">
      <label htmlFor="variable-select">Choose a {field}: </label>
      <select id="variable-select" value={selectedVariable} onChange={handleChange}>
        {variableList.map((variable, index) => (
          <option key={index} value={variable}>
            {variable}
          </option>
        ))}
      </select>
    </div>
  );
}