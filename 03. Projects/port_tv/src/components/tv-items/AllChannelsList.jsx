import { useState, useEffect, useCallback } from "react";

import AllChannelItem from "./AllChannelItem";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({ tvEventInit }) => {
  const [programs, setPrograms] = useState([]);
  const [actualUrlsIndex, setActualUrlsIndex] = useState(0);

  const pluck = (array, key) => {
    return array.map((item) => item[key]);
  };

  function* chunk(array, n) {
    for (let index = 0; index < array.length; index += n) {
      yield array.slice(index, index + n);
    }
  }

  const fetchActualUrl = useCallback(
    (urls) => {
      fetch(`${urls[actualUrlsIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("apiFetch: ", data);
          setPrograms((prevPrograms) => {
            return [
              ...prevPrograms,
              {
                channels: data.channels,
                date: data.date,
                date_from: data.date_from,
                date_to: data.date_to,
                eveningStartTime: data.eveningStartTime,
              },
            ];
          });
        });
    },
    [actualUrlsIndex]
  );

  const increseHandler = () => {
    setActualUrlsIndex(actualUrlsIndex + 1);
  };

  console.log("tároló state: ", programs);

  useEffect(() => {
    let date = `date=${tvEventInit.date.split("T")[0]}`;
    let ids = pluck(tvEventInit.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    console.log("ids: ", ids);
    console.log("chunks: ", chunks);
    console.log("urls: ", urls);

    fetchActualUrl(urls);
  }, [fetchActualUrl, tvEventInit.date, tvEventInit.channels]);

  return (
    <div className={classes.channelsWrapper}>
      {programs.length !== 0 &&
        programs.map((program) => <AllChannelItem programs={program} />)}
      <button onClick={increseHandler}>Increse</button>
    </div>
  );
};

export default AllChannelsList;
