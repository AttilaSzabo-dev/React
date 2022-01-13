import Health from "./HealthBoxItems/Health";
import Initiative from "./HealthBoxItems/Initiative";
import PoisonRes from "./HealthBoxItems/PoisonRes";
import Dummy from "./HealthBoxItems/Dummy";
import Border from "../../UI/Border";

import "./HealthBox.scss";

const HealthBox = () => {
  return (
    <Border className="health-box--container common-box--grid">
      <Health />
      <Initiative />
      <PoisonRes />
      <Dummy />
      <Dummy />
      <Dummy />
    </Border>
  );
};

export default HealthBox;
