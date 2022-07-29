import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ModalContext from "../../context/ModalContext";

import Modal from "../../UI/Modal";
import EditFavoriteChannels from "./EditFavoriteChannels";

import { RiHeartAddFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import classes from "./FilterList.module.css";
import ChannelFilter from "./ChannelFilter";

const FilterList = ({
  initData,
  dayHandler,
  programHandler,
  onFilterChannels,
}) => {
  const [modal, setModal] = useState(false);
  const value = { modal, setModal };

  const [categories, setCategories] = useState([]);
  const [days, setDays] = useState([]);
  const [counter, setCounter] = useState(3);
  const [active, setActive] = useState(false);
  const [daysSelectorDropdown, setDaysSelectorDropdown] = useState(false);
  const [programFilter, setProgramFilter] = useState({
    film: false,
    sorozat: false,
    sport: false,
    sportLive: false,
    reality: false,
    gastro: false,
    activeFilters: [],
  });

  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  const onModalOpen = () => {
    setModal(!modal);
  };

  const counterHandler = (e) => {
    if (e === 2) {
      setActive(false);
      dayHandler(days[e].timestamp);
      setCounter(e + 1);
    } else {
      setActive(true);
      setCounter(e);
      dayHandler(days[e].timestamp);
    }
    setDaysSelectorDropdown(false);
  };

  const programFilterHandler = (e) => {
    if (!programFilter.activeFilters.includes(e)) {
      setProgramFilter((prev) => ({
        ...prev,
        activeFilters: [...prev.activeFilters, e],
        [e]: true,
      }));
    } else {
      const filtered = programFilter.activeFilters.filter(
        (toremove) => toremove !== e
      );
      setProgramFilter((prev) => ({
        ...prev,
        activeFilters: filtered,
        [e]: false,
      }));
    }
  };

  const onSelectChange = (e) => {
    onFilterChannels(e.target.value);
  };

  useEffect(() => {
    if (typeof programHandler === "function") {
      programHandler(programFilter.activeFilters);
    }
  }, [programFilter.activeFilters]);

  useEffect(() => {
    let today = initData.date.split("T")[0];
    const date = new Date(today);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    initData.days.forEach((day) => {
      const date = new Date(day * 1000);
      const day_text = date.toLocaleString("hu-HU", { weekday: "long" });
      let dayFinal = day_text.charAt(0).toUpperCase() + day_text.slice(1);
      const day_num = date.toLocaleString("hu-HU", { day: "numeric" });
      const month = date.toLocaleString("hu-HU", { month: "long" });

      let tegnap = unixTimestamp - 86400;
      let ma = unixTimestamp;
      let holnap = unixTimestamp + 86400;
      let dayName;

      if (tegnap === day) {
        dayName = "Tegnap";
      } else if (ma === day) {
        dayName = "Ma";
      } else if (holnap === day) {
        dayName = "Holnap";
      } else {
        dayName = dayFinal;
      }

      setDays((prev) => [
        ...prev,
        {
          day_text: dayName,
          day_num: day_num,
          month: month,
          daysDateText: initData.daysDate,
          timestamp: day,
          today: unixTimestamp,
        },
      ]);
    });
  }, [initData.days]);

  useEffect(() => {
    let groups = Object.values(initData.channelGroups);
    setCategories(groups);
  }, [initData]);

  return (
    <>
      <ModalContext.Provider value={value}>
        <Modal toShow={`${modal ? "show" : ""}`}>
          <EditFavoriteChannels initData={initData} />
        </Modal>
      </ModalContext.Provider>
      <div className={classes.filterWrapper}>
        {days.length > 0 && (
          <div className={classes.dateContainer}>
            <button
              className={`${classes.buttons} ${!active ? classes.active : ""}`}
              onClick={(e) => counterHandler(2)}
            >
              <span className={classes.day}>{days[2].day_text}</span>
              <span className={classes.date}>
                {days[2].month} {days[2].day_num}
              </span>
            </button>
            <button
              className={`${classes.buttons} ${active ? classes.active : ""}`}
              onClick={(e) => counterHandler(counter)}
            >
              <span className={classes.day}>{days[counter].day_text}</span>
              <span className={classes.date}>
                {days[counter].month} {days[counter].day_num}
              </span>
            </button>
            <button
              className={classes.openDates}
              onClick={(e) => setDaysSelectorDropdown(true)}
            >
              <MdKeyboardArrowDown className={classes.downIcon} />
            </button>
            <div
              className={`${classes.daysSelector} ${
                daysSelectorDropdown ? classes.open : ""
              }`}
            >
              {days.map((day, index) => (
                <button
                  className={classes.daySelectorButtons}
                  onClick={(e) => counterHandler(index)}
                >
                  <span className={classes.daySelectorBold}>
                    {`${day.day_text} - `}
                    <span
                      className={classes.daySelectorRegular}
                    >{`${day.month} ${day.day_num}`}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className={classes.channelFilterEditContainer}>
          {isMobile && (
            <div className={classes.channelFilterMobile}>
              <ChannelFilter
                categories={categories}
                onSelectChange={onSelectChange}
              />
            </div>
          )}
          <button className={classes.modalButton} onClick={onModalOpen}>
            <RiHeartAddFill className={classes.editFavIcon} />
          </button>
        </div>
        <div className={classes.programFilterContainer}>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterFilm
            } ${programFilter.film ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("film")}
          >
            Film
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSeries
            } ${programFilter.sorozat ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sorozat")}
          >
            Sorozat
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSport
            } ${programFilter.sport ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sport")}
          >
            Sport
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSportLive
            } ${programFilter.sportLive ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sportLive")}
          >
            Sport (élő)
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterReality
            } ${programFilter.reality ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("reality")}
          >
            Reality
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterGastro
            } ${programFilter.gastro ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("gastro")}
          >
            Gasztró
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterList;
