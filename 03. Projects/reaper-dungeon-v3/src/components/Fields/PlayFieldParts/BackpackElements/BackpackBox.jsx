import { useState } from "react";
import BackpackItem from "./BackpackItem";

import { gearStore } from "../../../Stores/GearStore.js";
import classes from "./BackpackBox.module.scss";

const BackpackBox = (props) => {
  const [backpackItems, setBackpackItems] = useState([
    {
      type: "weapon",
      id: "basic_weapon_2",
    },
    {
      type: "head",
      id: "basic_head_2",
    },
    {
      type: "shield",
      id: "basic_shield_2",
    },
    {
      type: "hand",
      id: "basic_hand_2",
    },
    {
      type: "leg",
      id: "basic_leg_2",
    },
    {
      type: "feet",
      id: "basic_feet_2",
    },
    {
      type: "weapon",
      id: "basic_weapon_2",
    },
    {
      type: "head",
      id: "basic_head_2",
    },
    {
      type: "shield",
      id: "basic_shield_2",
    },
  ]);
  return (
    <div className={classes.section}>
      {backpackItems.map((item) => (
        <BackpackItem
          key={item.id}
          image={
            gearStore.find((storeItem) => item.id === storeItem.id).imagePath
          }
        />
      ))}
    </div>
  );
};

export default BackpackBox;
