import Dummy from "./InventoryItems/Dummy";
import Border from "../UI/Border";

import "./DefenseBox.scss";

const DefenseBox = () => {
  return (
    <Border className="defense-box--container common-box--grid">
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </Border>
  );
};

export default DefenseBox;