import InventorySections from "../../../UI/InventorySections";
import Dummy from "./InventoryItems/Dummy";

import "./HealthBox.scss";
import InventorySkillBox from "./InventoryItems/InventorySkillBox";

const HealthBox = () => {
  return (
    <InventorySections className="health-box--container">
      <InventorySkillBox />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </InventorySections>
  );
};

export default HealthBox;
