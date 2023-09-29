import { useState } from "react";

import classes from "./BackpackItem.module.scss";

const BackpackItem = ({
  image,
  uniqueId,
  statPanel,
  removeItem,
  transferItemToChar,
}) => {
  const [panel, setPanel] = useState(false);

  const hoverHandler = (status) => {
    setPanel(!panel);
    statPanel(status);
  };

  const dropItemHandler = () => {
    removeItem(uniqueId);
  };

  const addItemHandler = () => {
    transferItemToChar(uniqueId);
  };

  return (
    <div
      className={classes.gearContainer}
      onMouseEnter={() => {
        if (!panel) {
          hoverHandler(true);
        }
      }}
      onMouseLeave={() => {
        if (panel) {
          hoverHandler(false);
        }
      }}
    >
      {!panel && (
        <img
          className={classes.gearImageWrapper}
          src={require(`../../../../images/gear/${image}.png`)}
          alt=""
        />
      )}
      {panel && (
        <div className={classes.panel}>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.buttonAdd}
              onClick={addItemHandler}
              type="button"
            >
              Add
            </button>
            <button
              className={classes.buttonDrop}
              onClick={dropItemHandler}
              type="button"
            >
              Drop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackpackItem;
