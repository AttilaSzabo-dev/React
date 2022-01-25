import InventoryPicHolder from "../../../../UI/InventoryPicHolder";
import InventorySkillButton from "../../../../UI/InventorySkillButton";
import InventoryStatHolder from "../../../../UI/InventoryStatHolder";
import InventoryModifierHolder from "../../../../UI/InventoryModifierHolder";

import classes from "./InventorySkillBox.module.scss";

const InventorySkillBox = (props) => {
  const stat = 100;
  const modifier = 5;

  return (
    <div className={`${classes.box} ${props.className}`}>
      <InventoryPicHolder className={classes.picContainer} />
      <InventorySkillButton className={classes.buttonContainer} />
      <InventoryStatHolder className={classes.statContainer} stat={stat} />
      <InventoryModifierHolder className={classes.modifierContainer} modifier={stat + modifier} />
    </div>
  );
};

export default InventorySkillBox;
