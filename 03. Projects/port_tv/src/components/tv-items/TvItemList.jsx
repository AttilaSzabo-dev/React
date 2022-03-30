import TvItem from "./TvItem";

import classes from "./TvItemList.module.css";

const TvItemList = ({
  ageLimit,
  channelGroups,
  channels,
  date,
  days,
  daysDate,
  services,
  showType,
}) => {
    
  return (
    <>
      {channels.map((item) => (
        <TvItem key={item.id} logo={item.logo} name={item.name}/>
      ))}
    </>
  );
};

export default TvItemList;
