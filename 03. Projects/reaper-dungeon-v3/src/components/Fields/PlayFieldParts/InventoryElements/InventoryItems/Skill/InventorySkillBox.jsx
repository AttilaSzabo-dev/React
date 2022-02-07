import { useState } from "react";

import InventoryPicHolder from "./InventoryPicHolder";
import InventorySkillButton from "./InventorySkillButton";

import classes from "./InventorySkillBox.module.scss";

const InventorySkillBox = (props) => {
  const [useStat, setStat] = useState(100);
  const [availableStat, setAvailableStat] = useState(5);

  //const stat = 100;
  const modifier = 5;

  const addSkillPointsHandler = () => {
    if (availableStat === 0) {
      return false;
    }
    setStat(useStat + 1);
    setAvailableStat(availableStat - 1);
  };

  return (
    <div className={`${classes.box} ${props.className}`}>
      <InventoryPicHolder className={classes.picContainer} image={"test"} />
      <InventorySkillButton
        className={classes.buttonContainer}
        availableStat={availableStat}
        onClick={addSkillPointsHandler}
      />
      <div className={classes.statContainer}>
        <span>{useStat}</span>
      </div>
      <div className={classes.modifierContainer}>
        <span>{useStat + modifier}</span>
      </div>
    </div>
  );
};

export default InventorySkillBox;
