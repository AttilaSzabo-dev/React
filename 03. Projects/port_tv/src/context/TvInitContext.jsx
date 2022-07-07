import React from "react";

const TvInitContext = React.createContext({
  ageLimit: {},
  channelGroups: {},
  channels: [],
  date: "",
  filterDate: "",
  days: [],
  daysDate: [],
  showType: [],
  likedChannels: [],
  basicUrl: [],
  basicChannelFilterUrl: {},
  testHandler: ()=>{},
  addFavorites: ()=>{}
});

export default TvInitContext;
