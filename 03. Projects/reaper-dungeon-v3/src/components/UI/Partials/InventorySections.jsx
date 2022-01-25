import classes from "./InventorySections.module.scss";

const InventorySections = (props) => {
  return (
    <div className={`${classes.sections} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default InventorySections;
