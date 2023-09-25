import { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ item, onSendId, onSendConfirmation, matchConfirmation }) => {
  const [hide, setHide] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [matchDone, setMatchDone] = useState(false);

  const cardImage = require(`../assets/images/card-images/${item.id}.png`);
  const coverImage = require("../assets/images/cover-images/bg_01.png");

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
        setDisabled(true);
        sendConfirmation();
        setTimeout(() => {
          setHide(true);
          setDisabled(false);
        }, 1500);
      }
    } else if (
      matchConfirmation.counter === 2 &&
      !matchConfirmation.id.includes(item.id)
    ) {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 1500);
    }
  }, [matchConfirmation]);

  return (
    <div className="card-container">
      <button
        className={`card-item cover ${hide ? "hide-active" : "hide-disabled"}`}
        disabled={disabled}
        onClick={sendId}
      >
        <img src={coverImage} alt="" />
      </button>
      <div className={`card-item card ${matchDone ? "fade" : ""}`}>
        <img src={cardImage} alt="" />
      </div>
    </div>
  );
};

export default Card;
