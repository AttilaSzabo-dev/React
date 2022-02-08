import InventorySections from "../../../UI/Partials/InventorySections";
import InventorySkillBox from "./InventoryItems/Skill/InventorySkillBox";

import "./HealthBox.scss";

const HealthBox = () => {
  return (
    <InventorySections className="health-box--container">
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox />
      <InventorySkillBox />
      <InventorySkillBox />
      <InventorySkillBox />
      <InventorySkillBox />
    </InventorySections>
  );
};

export default HealthBox;
