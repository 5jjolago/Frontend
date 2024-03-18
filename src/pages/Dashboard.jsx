import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDistricts } from "../app/districtSlice";

import Elastic from "./Elastic";

function Dashboard() {
  const [FormattedQuery, setFormattedQuery] = useState("");
  const dispatch = useDispatch();
  const seoulDistricts = useSelector((state) => state.districts.seoulDistricts);
  const selectedLifestyle = useSelector(
    (state) => state.lifestyle.selectedLifestyle
  );

  const handleDataReceived = (data) => {
    dispatch(setDistricts(data));
  };

  useEffect(() => {
    // 배열 요소를 쿼리 문자열에 추가
    const query = seoulDistricts
      .map((districtObj) => {
        // 객체의 키(지역 이름)를 추출합니다.
        const districtName = Object.keys(districtObj)[0];
        return `sggnm.keyword:"${districtName}"`;
      })
      .join(" OR ");

    // 쿼리 문자열을 Kibana가 이해할 수 있는 형식으로 포맷
    const formattedQuery = `query:(language:kuery,query:'${query}')`;
    setFormattedQuery(encodeURIComponent(formattedQuery)); // URL 인코딩 추가
  }, [seoulDistricts]); // 의존성 배열에 seoulDistricts 추가

  const source =
    "https://kibana.nalraon.kr/app/dashboards?auth_provider_hint=anonymous1#/view/9f916a24-8c3e-4d39-a8d7-dc54bc0a3373?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&_a=(" +
    `${FormattedQuery}` +
    ")&hide-filter-bar=true";

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {/* <p>
        {selectedLifestyle} : {seoulDistricts}
      </p> */}
      <iframe
        key={FormattedQuery} // key를 FormattedQuery로 설정
        title="elastic-dashboard"
        src={source}
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
}

export default Dashboard;
