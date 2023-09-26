import "./InventoryGearBox.scss";

const InventoryGearBox = ({ image }) => {
  return (
    <div className="gearContainer">
      <img
        className="gearImageWrapper"
        src={require(`../../../../../../images/gear/${image}.png`)}
        alt=""
      />
    </div>
  );
};

export default InventoryGearBox;
