import ProgramsWrapper from "./ProgramsWrapper";
import AllChannelLogo from "./AllChannelLogo";
import ProgramItem from "./ProgramItem";
import AdLB from "../ad-items/AdLB";
import AdRB from "../ad-items/AdRB";
import AdRBB from "../ad-items/AdRBB";
import AdVirtual from "../ad-items/AdVirtual";
import SlickSlider from "./SlickSlider";

/* import classes from "./AllChannelPrograms.module.css"; */

const AllChannelPrograms = ({ channel, actualTime, timelineTimes, index, date, introCb, introKey }) => {
  let zones = window.zonesToLoad;

  return (
    <>
      {/* <AdFejlecCsik/> */}
      
      {channel === "Virtual"  ? <AdVirtual/> : ""}
      {index === 4 && zones.superleaderboard !== undefined && zones.superleaderboard.device === "desktop"  ? <AdLB/> : ""}{/* mobilon is */}
      {/* props.index === 0 && index === 5 && zones.medium_rectangle_b !== undefined ? <AdMR/> : "" */} {/* carousel ad */}
      {index === 18 && zones.roadblock_a !== undefined && zones.roadblock_a.device === "desktop" ? <AdRB/> : ""}{/* mobilon is */}
      {index === 20 && zones.roadblock_b !== undefined ? <AdRBB/> : ""}
      {index === 13 ? <SlickSlider/> : ""}

      {channel !== "Virtual" && <ProgramsWrapper timelineTimes={timelineTimes} index={index} channelStartTs={channel.channelStartTs}>
        <AllChannelLogo channel={channel} key={channel.id} id={channel.id} actualDate={date} introCb={index === 0 ? introCb : null} introKey={introKey} />
        {channel.programs.map((item) => (
          <ProgramItem
            key={item.id}
            notificId={item.notificId}
            reminderId={item.reminderId}
            actualTime={timelineTimes.actualTime}
            start_time={item.start_time}
            start_unixtime={item.start_unixtime}
            end_time={item.end_time}
            end_unixtime={item.end_unixtime}
            title={item.title}
            filmUrl={item.film_url}
            restriction={item.restriction}
            short_description={item.short_description}
          />
        ))}
      </ProgramsWrapper>}
    </>
  )
};

export default AllChannelPrograms;
