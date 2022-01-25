import AttackBox from "./InventoryElements/AttackBox";
import DefenseBox from "./InventoryElements/DefenseBox";
import HealthBox from "./InventoryElements/HealthBox";
import Field from "../../UI/Partials/Field";

import "./InventoryField.scss";

const IventoryField = () => {
  return (
    <Field className="inventory-field">
        <HealthBox></HealthBox>
        <AttackBox></AttackBox>
        <DefenseBox></DefenseBox>
    </Field>
  );
};

export default IventoryField;
