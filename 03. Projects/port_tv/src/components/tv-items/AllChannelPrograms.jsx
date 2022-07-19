import ProgramsWrapper from "./ProgramsWrapper";
import AllChannelLogo from "./AllChannelLogo";
import ProgramItem from "./ProgramItem";
import AdItemTop from "../ad-items/AdItemTop";
import AdItemBottom from "../ad-items/AdItemBottom";

/* import classes from "./AllChannelPrograms.module.css"; */

const AllChannelPrograms = (props) => {
  return props.programs.channels.map((channel, index) => (
    <>
      {/* {props.index === 0 && index === 3 ? <AdItemTop /> : ""}
      {props.index === 0 && index === 17 ? <AdItemBottom /> : ""} */}
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
