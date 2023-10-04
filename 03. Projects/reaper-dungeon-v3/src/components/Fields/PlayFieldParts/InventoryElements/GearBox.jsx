import GearBoxItem from "./InventoryItems/Gear/GearBoxItem";
import classes from "./GearBox.module.scss";

const GearBox = ({ charItems }) => {
  return (
    <div className={classes.section}>
      {charItems.map((item) =>
        item.nonItem ? (
          <div key={item.id} className={classes[item.id]}></div>
        ) : (
          <GearBoxItem key={item.id} image={item.imagePath} />
        )
      )}
    </div>
  );
};

export default GearBox;
