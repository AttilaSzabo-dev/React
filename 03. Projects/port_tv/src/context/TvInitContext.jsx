import React from "react";

const TvInitContext = React.createContext({
  ageLimit: {},
  channelGroups: {},
  channels: [],
  date: "",
  days: [],
  daysDate: [],
  showType: [],
  likedChannels: [],
  testHandler: ()=>{},
  addFavorites: ()=>{}
});

export default TvInitContext;
