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
    fetch(`https://port.hu/tvapi?channel_id=${params.channelId}&i_datetime_from=${daysDate[0].split("T")[0]}&i_datetime_to=${daysDate[14].split("T")[0]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let singleProgramVariable = data;
        let tempArray = [];
        Object.keys(singleProgramVariable).map((key) => 
          //console.log(key);
          //console.log(singleProgram[key]);
          
          tempArray.push({[key]: singleProgramVariable[key]})
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

  console.log("singleProgramArray: ", singleProgramArray[0]);

  return (
    <>
    <div className={classes.singleChannelLogo}>
      {/* <img src={singleProgramArray[0].channels.logo} alt="Logo" /> */}
    </div>
    {/* {singleProgramArray !== null &&
        singleProgramArray.map((day) => {
          return (
            <SingleChannelItem
              day={day}
              programs={day.channels[0].programs}
            />
          );
        })} */}
    </>
    
  );
};

export default SingleChannelList;
