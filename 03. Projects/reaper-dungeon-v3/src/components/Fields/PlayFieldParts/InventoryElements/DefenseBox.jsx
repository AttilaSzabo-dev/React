import InventorySections from "../../../UI/InventorySections";
import Dummy from "./InventoryItems/Dummy";

import "./DefenseBox.scss";

const DefenseBox = () => {
  return (
    <InventorySections className="defense-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </InventorySections>
  );
};

export default DefenseBox;
