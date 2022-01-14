import Dummy from "./InventoryItems/Dummy";
import Border from "../UI/Border";

import "./HealthBox.scss";

const HealthBox = () => {
  return (
    <Border className="health-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </Border>
  );
};

export default HealthBox;
