import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [playField, setPlayField] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    if (data !== null) {
      createBlocks();
    }
  }, [data]);

  useEffect(() => {
    if (playField !== null) {
      //console.log(playField);
    }
  }, [playField]);

  const createBlocks = () => {
    const baseData = data.map((card) => card).filter((card) => card.id <= 8);
    let finalData = [];

    for (let i = 0; i < baseData.length; i++) {
      for (let y = 0; y < 2; y++) {
        finalData.splice(Math.floor(Math.random() * (8 * 2)), 0, baseData[i].id)
      }
    }
    /* finalData.forEach((item) => {
      setPlayField(prev => [
        ...prev,
        baseData.map(card => card).some(card => item === card.id)
      ])
    }) */
    console.log(finalData);
  };


  return (
    <div>

    </div>
  );
}

export default App;
