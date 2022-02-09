import "./InventoryGearBox.scss";

const InventoryGearBox = (props) => {
  return (
    <div className="gearContainer">
      <div className={`gearImageWrapper ${props.image}`}></div>
    </div>
  );
};

export default InventoryGearBox;
