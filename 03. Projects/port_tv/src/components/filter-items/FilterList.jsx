import { useContext } from "react";
import Modal from "../../UI/Modal";

import { RiHeartAddFill } from "react-icons/ri";

import TvContext from "../../context/TvContext";

import classes from "./FilterList.module.css";
import EditFavoriteChannels from "./EditFavoriteChannels";

const FilterList = () => {
  const tvCtx = useContext(TvContext);

  return (
    <>
      <Modal>
        <EditFavoriteChannels/>
      </Modal>
      <div className={classes.filterWrapper}>
        <div className={classes.filterContainers}>
          <button className={classes.modalButton} onClick={tvCtx.setModal}>
            <RiHeartAddFill />
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterList;
