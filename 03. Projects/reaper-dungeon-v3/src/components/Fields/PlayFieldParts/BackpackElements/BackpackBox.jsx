import { useState } from "react";

import BackpackItem from "./BackpackItem";
import classes from "./BackpackBox.module.scss";

const BackpackBox = ({
  sendFromBackpackHandler,
  backpackItems,
  setBackpackItems,
}) => {
  const [statPanel, setStatPanel] = useState(false);

  // when adding a new item to the backpack
  const addNewItemHandler = (type, id) => {
    const itemBlueprint = {
      type: type,
      id: id,
      uniqueId: Math.floor(Math.random() * (10000000 - 1 + 1)) + 1,
    };

    setBackpackItems([...backpackItems, itemBlueprint]);
  };

  // when adding an item from the backpack to the char inventory
  const transferItemToCharHandler = (uniqueId) => {
    const selectedItem = backpackItems.find(
      (item) => item.uniqueId === uniqueId
    );
    sendFromBackpackHandler(selectedItem);
    setStatPanel(false);
  };

  // removing an item from the backpack
  const removeCurrentItemHandler = (uniqueId) => {
    const updatedItems = backpackItems.filter(
      (item) => item.uniqueId !== uniqueId
    );
    setBackpackItems(updatedItems);
    setStatPanel(false);
  };

  // show stats of the item
  const statPanelHandler = (status) => {
    setStatPanel(status);
  };

  return (
    <div className={classes.section}>
      {backpackItems.map((item) => (
        <BackpackItem
          key={item.uniqueId}
          image={item.imagePath}
          uniqueId={item.uniqueId}
          statPanel={statPanelHandler}
          removeItem={removeCurrentItemHandler}
          transferItemToChar={transferItemToCharHandler}
        />
      ))}
      {statPanel && (
        <div className={classes.statPanelWrapper}>
          <div className={classes.newItemStat}></div>
          <div className={classes.equippedItemStat}></div>
        </div>
      )}
    </div>
  );
};

export default BackpackBox;
