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

    window.iap_zones = window.iap_zones || [];
    window.iap_zones.push(zone);
  }, []);

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div
          ref={adRef}
          id={zones.tv_top_sponsoration.id}
          data-id={zones.tv_top_sponsoration.id}
          className="iap iap--ado ad-label--hidden ad-label--ghost empty bg--transparent"
        ></div>
      </div>
    </div>
  );
};

export default AdFejlecCsik;
