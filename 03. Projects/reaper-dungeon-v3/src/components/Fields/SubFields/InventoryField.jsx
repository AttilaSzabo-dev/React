import AttackBox from "../../InventoryBoxes/AttackBox";
import DefenseBox from "../../InventoryBoxes/DefenseBox";
import HealthBox from "../../InventoryBoxes/HealthBox";
import Border from "../../UI/Border";

import "./InventoryField.scss";

const IventoryField = () => {
  return (
    <div className="inventory-field">
      <Border className="inventory-field--container">
        <HealthBox></HealthBox>
        <AttackBox></AttackBox>
        <DefenseBox></DefenseBox>
      </Border>
    </div>
  );
};

export default IventoryField;
