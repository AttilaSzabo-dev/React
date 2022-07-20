import ProgramsWrapper from "./ProgramsWrapper";
import AllChannelLogo from "./AllChannelLogo";
import ProgramItem from "./ProgramItem";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AdLB from "../ad-items/AdLB";
import AdMR from "../ad-items/AdMR";
import AdRB from "../ad-items/AdRB";
import AdRBB from "../ad-items/AdRBB";

/* import classes from "./AllChannelPrograms.module.css"; */

const AllChannelPrograms = (props) => {
  let zones = window.zonesToLoad;

  console.log("zones: ", zones);

  return props.programs.channels.map((channel, index) => (
    <>
      {/* <AdFejlecCsik/> */}
      
      {props.index === 0 && index === 3 && zones.superleaderboard !== undefined && zones.superleaderboard.device === "desktop"  ? <AdLB/> : ""}
      {props.index === 0 && index === 5 && zones.medium_rectangle_b !== undefined ? <AdMR/> : ""} {/* carousel ad */}
      {props.index === 0 && index === 7 && zones.roadblock_a !== undefined && zones.roadblock_a.device === "desktop" ? <AdRB/> : ""}
      {props.index === 0 && index === 9 && zones.roadblock_b !== undefined ? <AdRBB/> : ""}

      <ProgramsWrapper timelineTimes={props.timelineTimes} index={index}>
        <AllChannelLogo channel={channel} key={channel.id} id={channel.id} />
        {channel.programs.map((item) => (
          <ProgramItem
            key={item.id}
            notificId={item.id}
            reminderId={item.film_id}
            actualTime={props.initData.date}
            startTime={item.start_time}
            endTime={item.end_time}
            title={item.title}
            filmUrl={item.film_url}
            start_ts={item.start_ts}
            end_datetime={item.end_datetime}
          />
        ))}
      </ProgramsWrapper>
    </>
  ));
};

export default AllChannelPrograms;
