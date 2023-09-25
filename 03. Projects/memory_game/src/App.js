import { useEffect, useState } from "react";

import "./App.css";
import Card from "./components/Card";

function App() {
  const [numberOfCards, setNumberOfCards] = useState(22);
  const [playField, setPlayField] = useState(null);
  const [compareId, setCompareId] = useState(null);
  const [confirmedMatchId, setConfirmedMatchId] = useState({
    id: [],
    match: false,
    counter: 0,
  });

  useEffect(() => {
    createBlocks();
  }, []);

  const createBlocks = () => {
    const finalData = [];

    for (let i = 1; i < numberOfCards; i++) {
      for (let y = 0; y < 2; y++) {
        let card = {
          id: i,
          key: i + (y === 0 ? "a" : "b"),
        };
        finalData.splice(Math.floor(Math.random() * (numberOfCards * 2)), 0, card);
      }
    }
    setPlayField(finalData);
  };

  const receiveId = (incomingId) => {
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
      <div className="scoreDisplay">

      </div>
      <div className="mainTable">
        <div className="mainGrid">
          {playField !== null &&
            playField.map((item) => (
              <Card
                key={item.key}
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
