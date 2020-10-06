import React, { useState } from "react";
import { Record } from './components/record/record.jsx';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleChange = e => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  };

  const onReaderLoad = (event) => {
    const obj = JSON.parse(event.target.result);
    setData(obj)
  }


  return (
    <>
      <h1>Upload A Json File</h1>

      <input className='ui button' type="file" onChange={handleChange} />
      <br />
      <Record rows={data}/>
    </>
  );
}

export default App;
