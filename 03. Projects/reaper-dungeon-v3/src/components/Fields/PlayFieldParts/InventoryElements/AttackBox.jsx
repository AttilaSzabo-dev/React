import InventorySections from "../../../UI/Partials/InventorySections";
import Dummy from "./InventoryItems/Dummy";

import "./AttackBox.scss";

const AttackBox = () => {
  return (
    <InventorySections className="attack-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </InventorySections>
  );
};

export default AttackBox;
