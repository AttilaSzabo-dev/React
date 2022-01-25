import classes from "./InventorySkillButton.module.scss";

const InventorySkillButton = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.button}>
        <span className="material-icons-outlined">arrow_circle_up</span>
        <span>5</span>
      </div>
    </div>
  );
};

export default InventorySkillButton;
