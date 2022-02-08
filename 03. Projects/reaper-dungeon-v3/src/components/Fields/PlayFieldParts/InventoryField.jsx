import Field from "../../UI/Partials/Field";
import SkillBox from "./InventoryElements/SkillBox";

import "./InventoryField.scss";

const IventoryField = () => {
  return (
    <Field className="inventory-field">
        <SkillBox />
        <SkillBox />
        <SkillBox />
    </Field>
  );
};

export default IventoryField;
