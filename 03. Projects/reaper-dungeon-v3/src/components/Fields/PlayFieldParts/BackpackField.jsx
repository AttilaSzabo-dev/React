import Field from "../../UI/Partials/Field";
import BackpackBox from "./BackpackElements/BackpackBox";

import "./BackpackField.scss";

const BackpackField = ({
  sendFromBackpackHandler,
  backpackItems,
  setBackpackItems,
}) => {
  return (
    <Field className="backpack-field">
      <BackpackBox
        sendFromBackpackHandler={sendFromBackpackHandler}
        backpackItems={backpackItems}
        setBackpackItems={setBackpackItems}
      />
    </Field>
  );
};

export default BackpackField;
