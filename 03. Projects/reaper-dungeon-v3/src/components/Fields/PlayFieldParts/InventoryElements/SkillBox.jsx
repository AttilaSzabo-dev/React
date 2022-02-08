import InventorySkillBox from "./InventoryItems/Skill/InventorySkillBox";

import classes from "./SkillBox.module.scss";

const SkillBox = (props) => {
  return (
    <div className={`${classes.sections} ${props.className}`}>
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox image={"heart"} />
      <InventorySkillBox image={"heart"} />
    </div>
  );
};

export default SkillBox;
