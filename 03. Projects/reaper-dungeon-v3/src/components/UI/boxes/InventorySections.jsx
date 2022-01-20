import classes from "./InventorySections.module.scss";

const InventorySections = (props) => {
  return (
    <div className={`${props.className} ${classes.sections}`}>
      {props.children}
    </div>
  );
};

export default InventorySections;
