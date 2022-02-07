import "./InventoryPicHolder.scss";

const InventoryPicHolder = (props) => {
  return (
    <div className={`skillPictureContainer ${props.className}`}>
      <div className={`skillPicture ${props.image}`}></div>
    </div>
  );
};

export default InventoryPicHolder;
