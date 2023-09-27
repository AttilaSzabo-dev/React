import { useState } from "react";
import GearBoxItem from "./InventoryItems/Gear/GearBoxItem";

import { gearStore } from "../../../Stores/GearStore.js";

import classes from "./GearBox.module.scss";

const GearBox = (props) => {
  const [allItems, setAllItems] = useState([
    {
      type: "weapon",
      id: "basic_weapon_1",
    },
    {
      type: "head",
      id: "basic_head_1",
    },
    {
      type: "shield",
      id: "basic_shield_1",
    },
    {
      type: "hand",
      id: "basic_hand_1",
    },
    {
      type: "leg",
      id: "basic_leg_1",
    },
    {
      type: "feet",
      id: "basic_feet_1",
    },
  ]);

  return (
    <div className={classes.section}>
      {allItems.map((item) => (
        <GearBoxItem
          key={item.id}
          image={
            gearStore.find((storeItem) => item.id === storeItem.id).imagePath
          }
        />
      ))}
    </div>
  );
};

export default GearBox;
