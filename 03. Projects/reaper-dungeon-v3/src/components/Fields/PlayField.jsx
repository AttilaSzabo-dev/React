import IventoryField from "./PlayFieldParts/InventoryField";
import DialogueField from "./PlayFieldParts/DialogueField";
import BackpackField from "./PlayFieldParts/BackpackField";

import "./PlayField.scss";

const PlayField = () => {
  return (
    <div className="playField">
      <IventoryField />
      <DialogueField />
      <BackpackField />
    </div>
  );
};

export default PlayField;
