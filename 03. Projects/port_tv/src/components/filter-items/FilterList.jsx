import { useState } from "react";
import ModalContext from "../../context/ModalContext";

import Modal from "../../UI/Modal";
import EditFavoriteChannels from "./EditFavoriteChannels";

import { RiHeartAddFill } from "react-icons/ri";

import classes from "./FilterList.module.css";

const FilterList = ({ initData }) => {
  const [modal, setModal] = useState(false);
  const value = { modal, setModal };

  const onModalOpen = () => {
    setModal(!modal);
  };
  console.log("FilterList render");

  return (
    <>
      <ModalContext.Provider value={value}>
        <Modal toShow={`${modal ? "show" : ""}`}>
          <EditFavoriteChannels initData={initData} />
        </Modal>
      </ModalContext.Provider>
      <div className={classes.filterWrapper}>
        <div className={classes.filterContainers}>
          <button className={classes.modalButton} onClick={onModalOpen}>
            <RiHeartAddFill />
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterList;
