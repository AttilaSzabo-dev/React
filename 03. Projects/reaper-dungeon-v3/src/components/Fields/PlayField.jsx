import { useState } from "react";
import IventoryField from "./PlayFieldParts/InventoryField";
import DialogueField from "./PlayFieldParts/DialogueField";
import BackpackField from "./PlayFieldParts/BackpackField";

import "./PlayField.scss";

const PlayField = () => {
  const [charItems, setCharItems] = useState([
    {
      id: "corner_t_l",
      nonItem: true,
    },
    {
      id: "basic_head_1",
      type: 5,
      imagePath: "head/basic_head_1",
    },
    {
      id: "corner_t_r",
      nonItem: true,
    },
    {
      id: "basic_sword_1",
      type: 8,
      imagePath: "sword/basic_sword_1",
    },
    {
      id: "basic_body_1",
      type: 1,
      imagePath: "body/basic_body_1",
    },
    {
      id: "set_shield_1",
      type: 7,
      imagePath: "shield/set_shield_1",
    },
    {
      id: "basic_hand_1",
      type: 4,
      imagePath: "hand/basic_hand_1",
    },
    {
      id: "basic_belt_1",
      type: 9,
      imagePath: "belt/basic_belt_1",
    },
    {
      id: "basic_feet_1",
      type: 3,
      imagePath: "feet/basic_feet_1",
    },
    {
      id: "corner_b_l",
      nonItem: true,
    },
    {
      id: "basic_leg_1",
      type: 6,
      imagePath: "leg/basic_leg_1",
    },
    {
      id: "corner_b_r",
      nonItem: true,
    },
  ]);
  const [backpackItems, setBackpackItems] = useState([
    {
      id: "basic_sword_2",
      type: 8,
      imagePath: "sword/basic_sword_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_head_2",
      type: 5,
      imagePath: "head/basic_head_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_shield_2",
      type: 7,
      imagePath: "shield/basic_shield_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_hand_2",
      type: 4,
      imagePath: "hand/basic_hand_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_leg_2",
      type: 6,
      imagePath: "leg/basic_leg_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_feet_2",
      type: 3,
      imagePath: "feet/basic_feet_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_head_2",
      type: 5,
      imagePath: "head/basic_head_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
    {
      id: "basic_shield_2",
      type: 7,
      imagePath: "shield/basic_shield_2",
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    },
  ]);

  const sendFromBackpackHandler = (transferedItem) => {
    let itemArrivingToBackpack;
    const updatedCharItems = charItems.map((item) => {
      if (item.type === transferedItem.type) {
        itemArrivingToBackpack = item;
        return transferedItem;
      }
      return item;
    });

    const itemBlueprint = {
      type: itemArrivingToBackpack.type,
      id: itemArrivingToBackpack.id,
      imagePath: itemArrivingToBackpack.imagePath,
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    };
    const updatedBackpackItems = [...backpackItems].filter(
      (item) => item.uniqueId !== transferedItem.uniqueId
    );
    updatedBackpackItems.push(itemBlueprint);

    setBackpackItems(updatedBackpackItems);
    setCharItems(updatedCharItems);
  };

  return (
    <div className="playField">
      <IventoryField charItems={charItems} />
      <DialogueField />
      <BackpackField
        sendFromBackpackHandler={sendFromBackpackHandler}
        backpackItems={backpackItems}
        setBackpackItems={setBackpackItems}
      />
    </div>
  );
};

export default PlayField;
