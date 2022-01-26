import { useState } from "react";

import InventoryPicHolder from "../../../../UI/InventoryPicHolder";
import InventorySkillButton from "../../../../UI/InventorySkillButton";
import InventoryStatHolder from "../../../../UI/InventoryStatHolder";
import InventoryModifierHolder from "../../../../UI/InventoryModifierHolder";

import classes from "./InventorySkillBox.module.scss";

const InventorySkillBox = (props) => {
const [useStat, setStat] = useState(100);

  //const stat = 100;
  const modifier = 5;
  const availableStat = 5;

  const addSkillPointsHandler = () => {
    setStat( useStat + 1)
  };

  return (
    <div
      className={`${classes.box} ${props.className}`}
      onClick={addSkillPointsHandler}
    >
      <InventoryPicHolder className={classes.picContainer} />
      <InventorySkillButton
        className={classes.buttonContainer}
        availableStat={availableStat}
      />
      <InventoryStatHolder className={classes.statContainer} stat={useStat} />
      <InventoryModifierHolder
        className={classes.modifierContainer}
        modifier={useStat + modifier}
      />
    </div>
  );
};

export default InventorySkillBox;
