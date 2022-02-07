import classes from "./InventorySkillButton.module.scss";

const InventorySkillButton = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <button className={classes.button} onClick={props.onClick}>
        <div className={classes.iconHolder}>
          <span className="material-icons-outlined">arrow_circle_up</span>
        </div>
        <div className={classes.statHolder}>
          <span>{props.availableStat}</span>
        </div>
      </button>
    </div>
  );
};

export default InventorySkillButton;
