import React from "react";
import { useState } from "react";

import Elastic from "./Elastic";

function Dashboard() {
  const [seoulDistricts, setSeoulDistricts] = useState([]);

  const handleDataReceived = (data) => {
    console.log("데이터 받았다");
    setSeoulDistricts(data);
  };

  // 배열 요소를 쿼리 문자열에 추가
  const query = seoulDistricts
    .map((district) => `sggnm.keyword:"${district}"`)
    .join("%20OR%20");

  // 쿼리 문자열을 적절한 형식으로 포맷
  const formattedQuery = `query:(language:kuery,query:'${query}')`;

  const source =
    "https://kibana.nalraon.kr/app/dashboards?auth_provider_hint=anonymous1#/view/9f916a24-8c3e-4d39-a8d7-dc54bc0a3373?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&_a=(" +
    `${formattedQuery}` +
    ")&hide-filter-bar=true";

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Elastic onDataReceived={handleDataReceived} />
      <iframe
        src={source}
        style={{ width: "100%", height: "100%" }}
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Dashboard;
