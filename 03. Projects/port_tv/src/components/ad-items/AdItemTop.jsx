import { useEffect } from "react";

//import { ado } from "./adOcean.js";

import classes from "./AdItemTop.module.css";

const AdItemTop = (props) => {
  useEffect(() => {}, []);

  window.ado.slave('adoceanindexhuqplmcsphle', {myMaster: 'N7CmXSrA8sU6C2.k69bI6CsovYAjH4cgo.eSqOHkpJn.V7' });

  return (
    <div className={classes.adItem}>
      <div className={classes.adContent}>
        <div id="adoceanindexhuqplmcsphle"></div>
      </div>
    </div>
  );
};

export default AdItemTop;