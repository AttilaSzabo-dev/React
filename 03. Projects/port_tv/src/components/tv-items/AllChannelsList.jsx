import { useState, useEffect, useCallback } from "react";
import AllChannelItem from "./AllChannelItem";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({ allProgram }) => {
  const [programs, setPrograms] = useState([]);

  
  let urlArray = [];
  let urlLength = 0;
  let urlTempLength = 0;

  let url = "";
    
    allProgram.channels.forEach((channel) => {
      url += `channel_id%5B%5D=${channel.id}&`;
      ++urlTempLength;
      ++urlLength;
      //console.log("urlTempLength: ", urlTempLength);
      if (urlTempLength === 40 || urlLength === allProgram.channels.length) {
        //console.log("url generáló ifben");
        //console.log(url);
        url += `date=${allProgram.date.split("T")[0]}`;
        urlArray.push(url);
        console.log(urlArray);
        //fetch(`tv-event/api?${url}`)
        //  .then((res) => {
        //    return res.json();
        //  })
        //  .then((data) => {
        //    console.log(data);
            //console.log("length set előtt: ", programs);
            /* setPrograms((prevPrograms) => {
              return [...prevPrograms, data];
              }); */
      //      setPrograms(data.channels);
            //console.log("length set után: ", programs);
      //    });
        url = "";
        urlTempLength = 0;
      }
    });

  useEffect(() => {
    
  }, []);

  return (
    <div className={classes.channelsWrapper}>
      {/* {programs.length > 0 &&
        (programs.channels || []).map((item) => (
          <AllChannelItem
            key={item.id}
            id={item.id}
            logo={item.logo}
            programs={item.programs}
          />
        ))} */}
    </div>
  );
};

export default AllChannelsList;
