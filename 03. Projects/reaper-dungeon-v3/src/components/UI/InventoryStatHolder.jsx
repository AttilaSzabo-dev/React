import classes from "./InventoryStatHolder.module.scss";

const InventoryStatHolder = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <span>{props.stat}</span>
    </div>
  );
};

export default InventoryStatHolder;
