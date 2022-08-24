import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SingleChannelItem from "./SingleChannelItem";

import FilterContext from "../../context/FilterContext";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import classes from "./SingleChannelList.module.css";
import FilterList from "../filter-items/FilterList";
import Spinner from "../../UI/Spinner";

const SingleChannelList = ({ initData }) => {
  const [singleProgramArray, setSingleProgramArray] = useState(null);
  const [forwardRefValue, setForwardRefValue] = useState(0);
  const container = useRef(null);
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const params = useParams();
  const { filterValues } = useContext(FilterContext);

  const isDesktop = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  const gemiusHit = (checkGemiusId, extra) => {
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string" &&
      typeof window.port_gemius_identifiers === "object"
    ) {
      //nyito gemius kod
      let sectionType = 'tv-csatorna';
      let code = window.port_gemius_identifiers[sectionType];
      if (checkGemiusId) {
        if (window.gemius_identifier !== code) {
          console.log('pp_gemius_hit', sectionType, code, extra);
          if (extra !== undefined) {
            window.pp_gemius_hit(code, `portevent=${extra}`);
          } else {
            window.pp_gemius_hit(code);
          }
          window.gemius_identifier = "";
        }
      } else {
        console.log('pp_gemius_hit', sectionType, code, extra);
        if (extra !== undefined) {
          window.pp_gemius_hit(code, `portevent=${extra}`);
        } else {
          window.pp_gemius_hit(code);
        }
      }
    }
  }

  useEffect(() => {
    console.log("window.location.href: ", window.location.href);
    console.log(window.location.href.split("date=")[1]);
    console.log(
      "unix: ",
      new Date(window.location.href.split("date=")[1]) / 1000
    );
    //console.log("params.channelId: ", params.channelId);
    //console.log("params.channelname: ", params.channelName);
    let channelId = params.channelId.split("?")[0];
    setIsLoading(true);
    fetch(
      `https://port.hu/tvapi?channel_id=${channelId}&i_datetime_from=${
        initData.daysDate[0].split("T")[0]
      }&i_datetime_to=${initData.daysDate[14].split("T")[0]}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let singleProgramVariable = data;
        let tempArray = [];
        Object.keys(singleProgramVariable).map((key) =>
          //console.log(key);
          //console.log(singleProgram[key]);

          tempArray.push({ [key]: singleProgramVariable[key] })
        );
        setSingleProgramArray(tempArray);
        setIsLoading(false);
        //setSingleProgram(data);
        //singleProgramVariable = data;
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        //setError(error.message);
      });

    gemiusHit(true);
  }, [initData, params.channelId]);

  const goLeft = () => {
    if (isMobile) {
      container.current.scrollLeft -= forwardRefValue;
    } else {
      container.current.scrollLeft -= 300;
    }
    gemiusHit(false, "singlechannel-left");
  };

  const goRight = () => {
    if (isMobile) {
      container.current.scrollLeft += forwardRefValue;
    } else {
      container.current.scrollLeft += 300;
    }
    gemiusHit(false, "singlechannel-right");
  };

  const initScroll = (value) => {
    let positionToScroll;

    if (isMobile) {
      if (value !== 0) {
        positionToScroll = value * forwardRefValue;
      }
    } else {
      if (value !== 0) {
        positionToScroll = value * 300;
      }
    }
    container.current.scrollLeft += positionToScroll;
  };

  const findIndex = () => {
    const resultIndex = singleProgramArray.findIndex(
      (item) =>
        Object.values(item)[0].formattedDate.split("T")[0] ===
        window.location.href.split("date=")[1]
    );
    initScroll(resultIndex);
  };

  const sendOffsetHandler = (value) => {
    setForwardRefValue(value);
  };

  useEffect(() => {
    if (singleProgramArray !== null) {
      findIndex();
    }
  }, [singleProgramArray, forwardRefValue]);

  useEffect(() => {
    const filterDate = new Date(filterValues.dateFilter * 1000);
    const year = filterDate.getFullYear();
    const month = filterDate.toLocaleString("hu-HU", { month: "2-digit" });
    const day = filterDate.toLocaleString("hu-HU", { day: "2-digit" });
    const finalDate = `${year}-${month}-${day}`;
    if (singleProgramArray !== null) {
      const resultIndex = singleProgramArray.findIndex(
        (item) =>
          Object.values(item)[0].formattedDate.split("T")[0] === finalDate
      );
      let positionToScroll;

      if (isMobile) {
        if (resultIndex !== 0) {
          positionToScroll = resultIndex * forwardRefValue;
        }
      } else {
        if (resultIndex !== 0) {
          positionToScroll = resultIndex * 300;
        }
      }
      container.current.scrollLeft = positionToScroll;
    }
  }, [filterValues]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className={classes.singleChannelLogoWrapper}>
        {singleProgramArray !== null && (
          <div className={classes.logoWrapper}>
            <img
              src={Object.values(singleProgramArray[0])[0].channels[0].logo}
              alt="Logo"
            />
          </div>
        )}
        <button
          onClick={goLeft}
          className={`${classes.leftButton} ${classes.buttons}`}
        >
          <img src="/img/svg/leftArrowBlack.svg" alt="" style={{maxWidth: "unset"}} />
        </button>
        <button
          onClick={goRight}
          className={`${classes.rightButton} ${classes.buttons}`}
        >
          <img src="/img/svg/rightArrowBlack.svg" alt="" style={{maxWidth: "unset"}} />
        </button>
      </div>
      <div ref={container} className={classes.singleChannelWrapper}>
        {singleProgramArray !== null &&
          singleProgramArray.map((day) => {
            return (
              <SingleChannelItem
                day={Object.keys(day)[0]}
                programs={day[Object.keys(day)[0]]}
                sendOffset={sendOffsetHandler}
              />
            );
          })}
      </div>
    </>
  );
};

export default SingleChannelList;
