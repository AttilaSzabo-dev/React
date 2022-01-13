import Dummy from "../HealthBox/HealthBoxItems/Dummy";
import Border from "../../UI/Border";

import "./AttackBox.scss";

const AttackBox = () => {
  return (
    <Border className="attack-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </Border>
  );
};

export default AttackBox;