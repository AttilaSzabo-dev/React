import { useState, useEffect } from "react";
import ModalContext from "../../context/ModalContext";

import Modal from "../../UI/Modal";
import EditFavoriteChannels from "./EditFavoriteChannels";

import { RiHeartAddFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import classes from "./FilterList.module.css";

const FilterList = ({ initData, dayHandler }) => {
  const [modal, setModal] = useState(false);
  const value = { modal, setModal };

  const [days, setDays] = useState([]);
  const [counter, setCounter] = useState(3);
  const [active, setActive] = useState(false);
  const [daysSelector, setDaysSelector] = useState(false);

  const onModalOpen = () => {
    setModal(!modal);
  };

  const counterHandler = (e) => {
    setCounter(e);
    setDaysSelector(!daysSelector);
    dayHandler(days[counter].timestamp);
    if (e === 2) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  useEffect(() => {
    const expanse = "T00:00:00+02:00"
    let today = initData.date;
    today = today.split('T')[0];
    let final = today + expanse;
    const todayDate = new Date(final * 1000);
    initData.days.forEach((day) => {
      const date = new Date(day * 1000);
      const day_text = date.toLocaleString("hu-HU", { weekday: "long" });
      const day_num = date.toLocaleString("hu-HU", { day: "numeric" });
      const month = date.toLocaleString("hu-HU", { month: "long" });

      setDays((prev) => [
        ...prev,
        { day_text: day_text, day_num: day_num, month: month, daysDate: initData.daysDate, timestamp: day, today: todayDate },
      ]);
    });
  }, [initData.days]);

  console.log("days: ", days);

  return (
    <>
      <ModalContext.Provider value={value}>
        <Modal toShow={`${modal ? "show" : ""}`}>
          <EditFavoriteChannels initData={initData} />
        </Modal>
      </ModalContext.Provider>
      <div className={classes.filterWrapper}>
        <div className={classes.filterContainers}>
        {days.length > 0 && <div className={classes.dateContainer}>
             <button className={`${classes.buttons} ${!active ? classes.active : ""}`} onClick={(e=>(dayHandler(days[2].timestamp)))}>
              <span className={classes.day}>Ma</span>
              <span className={classes.date}>{days[2].month} {days[2].day_num}</span>
            </button>
            <button className={`${classes.buttons} ${active ? classes.active : ""}`} onClick={(e=>(dayHandler(days[counter].timestamp)))}>
              <span className={classes.day}>Holnap</span>
              <span className={classes.date}>{days[counter].month} {days[counter].day_num}</span>
            </button>
            <button className={classes.openDates} onClick={(e)=>(setDaysSelector(!daysSelector))}>
              <MdKeyboardArrowDown className={classes.downIcon} />
            </button>
            <div className={`${classes.daysSelector} ${daysSelector ? classes.open : ""}`}>
            {days.map((day, index) => 
              <button className={classes.daySelectorButtons} onClick={(e)=>(counterHandler(index))}>
                <span className={classes.daySelectorBold}>{`${day.day_text} - `}<span className={classes.daySelectorRegular}>{`${day.month} ${day.day_num}`}</span></span>
              </button>
            )}
            </div>
          </div>}
          <button className={classes.modalButton} onClick={onModalOpen}>
            <RiHeartAddFill className={classes.editFavIcon}/>
          </button>
          <div className={classes.programFilterContainer}>
            <button className={`${classes.programFilterButtons} ${classes.programFilterFilm}`}>Film</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSeries}`}>Sorozat</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSport}`}>Sport</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSportLive}`}>Sport (élő)</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterReality}`}>Reality</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterGastro}`}>Gasztró</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterList;
