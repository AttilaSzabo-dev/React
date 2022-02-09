import { useState } from "react";

import InventoryPicHolder from "./InventoryPicHolder";
import InventorySkillButton from "./InventorySkillButton";

import classes from "./InventorySkillBox.module.scss";

const InventorySkillBox = (props) => {
  const [useStat, setStat] = useState(100);
  const [availableStat, setAvailableStat] = useState(10);

  const addSkillPointsHandler = () => {
    if (availableStat === 0) {
      return false;
    }
    setStat(useStat + 1);
    setAvailableStat(availableStat - 1);
  };

  return (
    <div className={`${classes.box} ${props.className}`}>
      <InventoryPicHolder
        className={classes.picContainer}
        image={props.image}
      />
      <div className={classes.buttonContainer}>
        <InventorySkillButton
          availableStat={availableStat}
          onClick={addSkillPointsHandler}
        />
      </div>

      <div className={classes.statContainer}>
        <span>{useStat}</span>
      </div>
    </div>
  );
};

export default InventorySkillBox;
