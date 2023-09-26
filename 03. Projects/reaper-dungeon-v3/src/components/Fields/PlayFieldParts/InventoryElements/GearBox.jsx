import classes from "./GearBox.module.scss";
import InventoryGearBox from "./InventoryItems/Gear/InventoryGearBox";
import { gearStore } from "../../../Stores/GearStore.js";

const GearBox = (props) => {
  console.log(gearStore);
  return (
    <div className={classes.section}>
      <InventoryGearBox image={gearStore[0].imagePath} />
      <InventoryGearBox image={gearStore[0].imagePath} />
      <InventoryGearBox image={gearStore[0].imagePath} />
      <InventoryGearBox image={gearStore[0].imagePath} />
      <InventoryGearBox image={gearStore[0].imagePath} />
      <InventoryGearBox image={gearStore[0].imagePath} />
    </div>
  );
};

export default GearBox;
