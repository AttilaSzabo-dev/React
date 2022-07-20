import { useEffect, useRef } from "react";

const AdLB = (props) => {
  const adRef = useRef();

  useEffect(()=> {
    let zones = window.zonesToLoad;

    const zone = {
      "id": zones.superleaderboard.id,
      "empty": true,
      "lazy": false,
      "quality": zones.superleaderboard.quality,
      "masterless": zones.superleaderboard.masterless, 
      "area": zones.superleaderboard.area, /* Leaderboard */
      "node": adRef.current,
      "events": {
        "loaded": false, 
        "visible": false,
        "viewed": false
      },
      "stat": {
        "site": "port",
        "path": "",
        "type": "tv/nyito"
      }
    }

    console.log("zones: ", zones);

    if (typeof window.ADOLoader === "undefined") {
      window.iap_zones = window.iap_zones || [];
      window.iap_zones.push(zone);
    }else {
      const callback = () => {};
      window.ADOLoader.AdEngine.append(zone, callback)
    }
  }, [])
  

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id="adoceanindexhuqbnqnqjsra" data-id="adoceanindexhuqbnqnqjsra"></div>
      </div>
    </div>
  );
};

export default AdLB;
