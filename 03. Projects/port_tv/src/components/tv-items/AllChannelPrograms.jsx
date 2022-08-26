import ProgramsWrapper from "./ProgramsWrapper";
import AllChannelLogo from "./AllChannelLogo";
import ProgramItem from "./ProgramItem";
import SlickSlider from "./SlickSlider";

/* import classes from "./AllChannelPrograms.module.css"; */

const AllChannelPrograms = ({ channel, actualTime, timelineTimes, index, date, introCb, introKey }) => {

  return (
    <>
      {index === 13 ? <SlickSlider key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/> : ""}
      {channel.ad && channel.content}
      {!channel.ad && <ProgramsWrapper timelineTimes={timelineTimes} index={index} channelStartTs={channel.channelStartTs}>
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
            episode_title={item.episode_title}
          />
        ))}
      </ProgramsWrapper>}
    </>
  )
};

export default AllChannelPrograms;
