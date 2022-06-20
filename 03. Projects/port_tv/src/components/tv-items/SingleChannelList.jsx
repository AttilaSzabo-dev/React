import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SingleChannelItem from "./SingleChannelItem";

import classes from "./SingleChannelList.module.css";

const SingleChannelList = ({ daysDate }) => {
  const [singleProgramArray, setSingleProgramArray] = useState(null);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(
      `https://port.hu/tvapi?channel_id=${params.channelId}&i_datetime_from=${
        daysDate[0].split("T")[0]
      }&i_datetime_to=${daysDate[14].split("T")[0]}`
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
        //setSingleProgram(data);
        //singleProgramVariable = data;
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        //setError(error.message);
      });
  }, [daysDate, params.channelId]);

  console.log("singleProgramArray: ", singleProgramArray);

  return (
    <>
      <div className={classes.singleChannelLogo}>
        {/* <img src={singleProgramArray[Object.keys(singleProgramArray)[0]].channels.logo} alt="Logo" /> */}
      </div>
      <div className={classes.singleChannelWrapper}>
        {singleProgramArray !== null &&
          singleProgramArray.map((day) => {
            return (
              <SingleChannelItem
                day={Object.keys(day)[0]}
                programs={day[Object.keys(day)[0]]}
              />
            );
          })}
      </div>
    </>
  );
};

export default SingleChannelList;
