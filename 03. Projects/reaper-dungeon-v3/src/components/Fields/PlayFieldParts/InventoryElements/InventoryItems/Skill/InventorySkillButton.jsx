import classes from "./InventorySkillButton.module.scss";

const InventorySkillButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.ready}`}
      onClick={props.onClick}
    >
      <div className={classes.statHolder}>{props.availableStat}</div>
    </button>
  );
};

export default InventorySkillButton;
