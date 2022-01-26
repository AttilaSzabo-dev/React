import classes from "./InventorySkillButton.module.scss";

const InventorySkillButton = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.button}>
        <div className={classes.iconHolder}>
          <span className="material-icons-outlined">arrow_circle_up</span>
        </div>
        <div className={classes.statHolder}>
          <span>{props.availableStat}</span>
        </div>
      </div>
    </div>
  );
};

export default InventorySkillButton;
