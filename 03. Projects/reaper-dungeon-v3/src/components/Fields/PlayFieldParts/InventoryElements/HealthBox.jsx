import Dummy from "./InventoryItems/Dummy";

import "./HealthBox.scss";
import InventorySections from "../../../UI/boxes/InventorySections";

const HealthBox = () => {
  return (
    <InventorySections className="health-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </InventorySections>
  );
};

export default HealthBox;
