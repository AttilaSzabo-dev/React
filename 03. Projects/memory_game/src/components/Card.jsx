import { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ item, onSendId, onSendConfirmation, matchConfirmation }) => {
  const [hide, setHide] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [matchDone, setMatchDone] = useState(false);

  const sendId = () => {
    onSendId(item.id);
    setDisabled(true);
    setHide(false);
  };

  const sendConfirmation = () => {
    onSendConfirmation();
  };

  useEffect(() => {
    if (
      matchConfirmation.counter === 2 &&
      matchConfirmation.id.includes(item.id)
    ) {
      if (matchConfirmation.match) {
        setHide(false);
        setDisabled(true);
        setMatchDone(true);
        sendConfirmation();
    } else {
        setHide(true);
        setDisabled(false);
        sendConfirmation();
      }
    }
  }, [matchConfirmation]);

  return (
    <div className="card-container">
      <button
        className={`card-item ${hide ? "hide-active" : "hide-disabled"}`}
        disabled={disabled}
        onClick={sendId}
      ></button>
      <div className={`card-item show ${matchDone ? "fade" : ""}`}>
        <img src={item.url} alt="" />
      </div>
    </div>
  );
};

export default Card;
