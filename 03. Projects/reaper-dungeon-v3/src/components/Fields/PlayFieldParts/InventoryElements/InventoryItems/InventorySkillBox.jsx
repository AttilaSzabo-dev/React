import InventorySkillButton from "../../../../UI/InventorySkillButton";

import classes from "./InventorySkillBox.module.scss";

const InventorySkillBox = (props) => {
  const stat = "100";

  return (
    <div className={`${classes.box} ${props.className}`}>
      <div className={classes["pic-container"]}>
        <img src={require("../../../../../images/stat/health/heart.png")} alt="" />
      </div>
      <div className={classes["stat-container"]}>
        <div className={classes.stat}>{stat}</div>
        <div className={classes.button}>
          <InventorySkillButton />
        </div>
      </div>
    </div>
  );
};

export default InventorySkillBox;
