import classes from "./InventoryModifierHolder.module.scss";

const InventoryModifierHolder = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <span>{props.modifier}</span>
    </div>
  );
};

export default InventoryModifierHolder;
