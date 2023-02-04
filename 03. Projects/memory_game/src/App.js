import { useEffect, useState } from "react";

import "./App.css";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);
  const [playField, setPlayField] = useState(null);
  const [compareId, setCompareId] = useState(null);
  const [confirmedMatchId, setConfirmedMatchId] = useState({
    id: [],
    match: false,
    counter: 0,
  });

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
    console.log("comapreId: ", compareId);
  }, [compareId]);
  useEffect(() => {
    console.log("confirmedMatchId: ", confirmedMatchId);
  }, [confirmedMatchId]);

  const createBlocks = () => {
    const baseData = data.map((card) => card).filter((card) => card.id <= 21);
    console.log(baseData);
    let finalData = [];

    for (let i = 0; i < baseData.length; i++) {
      for (let y = 0; y < 2; y++) {
        let card = {
          id: baseData[i].id,
          url: baseData[i].url,
          name: baseData[i].id + (y === 0 ? "a" : "b"),
        };
        finalData.splice(Math.floor(Math.random() * (21 * 2)), 0, card);
      }
    }
    setPlayField(finalData);
  };

  const receiveId = (incomingId) => {
    console.log(incomingId);
    if (compareId === null) {
      setCompareId(incomingId);
      setConfirmedMatchId((prev) => ({
        ...prev,
        id: [...prev.id, incomingId],
        counter: 1,
      }));
    } else {
      if (compareId === incomingId) {
        setConfirmedMatchId((prev) => ({
          ...prev,
          id: [...prev.id, incomingId],
          match: true,
          counter: 2,
        }));
      } else {
        setConfirmedMatchId((prev) => ({
          ...prev,
          id: [...prev.id, incomingId],
          match: false,
          counter: 2,
        }));
      }
    }
  };

  const receivedConfirmation = () => {
    setCompareId(null);
    setConfirmedMatchId({ id: [], match: false, counter: 0 });
  };

  return (
    <div className="mainBackground">
      <div className="mainTable">
        <div className="mainGrid">
          {playField !== null &&
            playField.map((item) => (
              <Card
                key={item.name}
                item={item}
                onSendId={receiveId}
                matchConfirmation={confirmedMatchId}
                onSendConfirmation={receivedConfirmation}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
