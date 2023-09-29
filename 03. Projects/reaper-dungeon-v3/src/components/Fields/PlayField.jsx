import { useState } from "react";
import IventoryField from "./PlayFieldParts/InventoryField";
import DialogueField from "./PlayFieldParts/DialogueField";
import BackpackField from "./PlayFieldParts/BackpackField";

import "./PlayField.scss";

const PlayField = () => {
  const [charItems, setCharItems] = useState([
    {
      id: "basic_sword_1",
      type: 8,
      imagePath: "sword/basic_sword_1",
    },
    {
      id: "basic_head_1",
      type: 5,
      imagePath: "head/basic_head_1",
    },
    {
      id: "basic_shield_1",
      type: 7,
      imagePath: "shield/basic_shield_1",
    },
    {
      id: "basic_hand_1",
      type: 4,
      imagePath: "hand/basic_hand_1",
    },
    {
      id: "basic_leg_1",
      type: 6,
      imagePath: "leg/basic_leg_1",
    },
    {
      id: "basic_feet_1",
      type: 3,
      imagePath: "feet/basic_feet_1",
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
  const [fromBackpack, setFromBackpack] = useState();
  const [toBackpack, setToBackpack] = useState();

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
  const sendToBackpackHandler = (item) => {
    setToBackpack(item);
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
