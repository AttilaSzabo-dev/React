import React from "react";

const TvContext = React.createContext({
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
  urlIndex: null,
  filteredChannelUrl: {},
  filteredProgramChannelUrl: {},
  programs: [],
  csrf: "",
  tvData: {},
  switches: {},
  setModal: ()=>{},
  setLoading: ()=>{},
  setFavorites: ()=>{},
  setReminders: ()=>{},
  setNotifications: ()=>{},
  setPrograms: ()=>{}
});

export default TvContext;
