import IventoryField from "./SubFields/InventoryField";
import DialogueField from "./SubFields/DialogueField";
import BackpackField from "./SubFields/BackpackField";

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
