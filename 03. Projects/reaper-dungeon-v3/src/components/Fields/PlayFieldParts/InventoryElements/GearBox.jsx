import GearBoxItem from "./InventoryItems/Gear/GearBoxItem";
import classes from "./GearBox.module.scss";

const GearBox = ({ charItems }) => {
  return (
    <div className={classes.section}>
      {charItems.map((item) => (
        <GearBoxItem key={item.id} image={item.imagePath} />
      ))}
    </div>
  );
};

export default GearBox;
