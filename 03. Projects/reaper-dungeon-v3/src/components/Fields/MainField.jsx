import IventoryField from "./InventoryField";
import DialogueField from "./DialogueField";
import BackpackField from "./BackpackField";

import "./MainField.scss";

const MainField = () => {
  return (
    <div className="mainField">
      <IventoryField />
      <DialogueField />
      <BackpackField />
    </div>
  );
};

export default MainField;
