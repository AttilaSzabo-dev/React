import classes from "./GearBox.module.scss";
import InventoryGearBox from "./InventoryItems/Gear/InventoryGearBox";

const GearBox = (props) => {
  return (
    <div className={classes.section}>
      <InventoryGearBox image={"basic_weapon_1"}/>
      <InventoryGearBox image={"basic_body_1"}/>
      <InventoryGearBox image={"basic_shield_1"}/>
      <InventoryGearBox image={"basic_hand_1"}/>
      <InventoryGearBox image={"basic_leg_1"}/>
      <InventoryGearBox image={"basic_feet_1"}/>
    </div>
  );
};

export default GearBox;
