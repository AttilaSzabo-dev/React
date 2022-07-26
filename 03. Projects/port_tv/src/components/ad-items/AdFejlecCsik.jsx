import { useEffect, useRef } from "react";
import "./ad.css";

const AdFejlecCsik = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(() => {
    const zone = {
      id: zones.tv_top_sponsoration.id,
      empty: true,
      lazy: false,
      quality: zones.tv_top_sponsoration.quality,
      masterless: zones.tv_top_sponsoration.masterless,
      area: zones.tv_top_sponsoration.area,
      node: adRef.current,
      events: {
        loaded: false,
        visible: false,
        viewed: false,
      },
      stat: {
        site: "port",
        path: "",
        type: "tv/nyito",
      },
    };

    if (typeof window.ADOLoader === "undefined") {
      window.iap_zones = window.iap_zones || [];
      window.iap_zones.push(zone);
    } else {
      const callback = () => {};
      window.ADOLoader.AdEngine.append(zone, callback);
    }
  }, []);

  return (
    <div className={"adItem"}>
      <div
        ref={adRef}
        id={zones.tv_top_sponsoration.id}
        data-id={zones.tv_top_sponsoration.id}
        className={"adContent"}
      ></div>
    </div>
  );
};

export default AdFejlecCsik;
