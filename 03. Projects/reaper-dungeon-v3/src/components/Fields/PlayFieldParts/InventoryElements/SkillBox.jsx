import InventorySkillBox from "./InventoryItems/Skill/InventorySkillBox";

import classes from "./SkillBox.module.scss";

const SkillBox = (props) => {
  return (
    <div className={`${classes.sections} ${props.className}`}>
      {props.boxData.map((item) => (
        <InventorySkillBox key={item.id} image={item.pic_name} />
      ))}
    </div>
  );
};

export default SkillBox;
