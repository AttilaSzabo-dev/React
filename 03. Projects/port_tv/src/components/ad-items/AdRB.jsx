import { useEffect, useRef } from "react";

const AdRB = (props) => {
  const adRef = useRef();

  useEffect(()=> {
    let zones = window.zonesToLoad;

    const zone = {
      "id": zones.roadblock_a.id,
      "empty": true,
      "lazy": false,
      "quality": zones.roadblock_a.quality,
      "masterless": zones.roadblock_a.masterless, 
      "area": zones.roadblock_a.area, /* Roadblock */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id="adoceanindexhuncehbodhsz" data-id="adoceanindexhuncehbodhsz"></div>
      </div>
    </div>
  );
};

export default AdRB;
