import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDistricts } from "../app/districtSlice";

const Elastic = ({ selectedLifestyle }) => {
  const dispatch = useDispatch();

  const ElasticAPIKey =
    "Rm1vaV9vMEJPX1d4QU1FNmhhZDY6aFNDei1oZS1TVG1DZGw3dm5KempzUQ==";

  useEffect(() => {
    console.log("Elastic 컴포넌트", selectedLifestyle);
    // selectedLifestyle에 따라 쿼리 조건 동적 생성

    const getQueryForLifestyle = (selectedLifestyle) => {
      console.log(selectedLifestyle);
      switch (selectedLifestyle) {
        case "MZ세대":
          return [
            { match: { "공원_1인당_공원면적(㎡)_분류": "상" } },
            { match: { 감염병_분류: "하" } },
            { match: { 학원_지역구별_개수_분류: "상" } },
            { match: { 음식점수_분류: "상" } },
            { match: { 문화시설_개수_분류: "상" } },
            { match: { 체육시설_수_분류: "상" } },
            { match: { 편의점수_분류: "상" } },
          ];

        case "자기계발형":
          return [
            { match: { "공원_1인당_공원면적(㎡)_분류": "중" } },
            { match: { 슈퍼마켓수_분류: "중" } },
            { match: { 지하철역수_분류: "상" } },
            { match: { 버스정류장수_분류: "상" } },
            { match: { 학원_지역구별_개수_분류: "중" } },
            { match: { 문화시설_개수_분류: "상" } },
            { match: { 체육시설_수_분류: "상" } },
          ];
        case "1인 가구":
          return [
            { match: { 읍면동_평균공시지가_분류: "하" } },
            { match: { "15~64세_분류_한국인": "상" } },
            { match: { 범죄_분류: "중" } },
            { match: { 슈퍼마켓수_분류: "상" } },
            { match: { 편의점수_분류: "상" } },
            { match: { 문화시설_개수_분류: "상" } },
            { match: { 지하철역수_분류: "중" } },
            { match: { 버스정류장수_분류: "중" } },
          ];
        case "신혼부부":
          return [
            { match: { "공원_1인당_공원면적(㎡)_분류": "중" } },
            { match: { 아파트_비율_분류: "상" } },
            { match: { 편의시설수_분류: "중" } },
            { match: { 유치원_개수_분류: "상" } },
          ];
        case "초등 학부모":
          return [
            { match: { 아파트_비율_분류: "상" } },
            { match: { 초등학교_지역구별_개수_분류: "상" } },
            { match: { 의원_수_분류: "중" } },
            { match: { 편의시설수_분류: "상" } },
          ];
        case "중고등 학부모":
          return [
            { match: { 아파트_비율_분류: "상" } },
            { match: { 중학교_지역구별_개수_분류: "상" } },
            { match: { 고등학교_지역구별_개수_분류: "상" } },
            { match: { 학원_지역구별_개수_분류: "상" } },
          ];
        case "반려동물 가구":
          return [
            { match: { 아파트_비율_분류: "하" } },
            { match: { 교통사고_분류: "하" } },
            { match: { 동물병원_수_분류: "상" } },
            { match: { 슈퍼마켓수_분류: "상" } },
            { match: { "공원_1인당_공원면적(㎡)_분류": "상" } },
            { match: { 동물병원_수_분류: "상" } },
            { match: { 문화시설_개수_분류: "상" } },
          ];
        case "은퇴 세대":
          return [
            { match: { "녹지_총면적(㎡)_분류": "상" } },
            { match: { "65세_이상_분류_한국인": "상" } },
            { match: { 감염병_분류: "중" } },
            { match: { 편의시설수_분류: "중" } },
            { match: { 지하철역수_분류: "중" } },
            { match: { 버스정류장수_분류: "중" } },
            { match: { 의원_수_분류: "상" } },
            { match: { 약국_수_분류: "상" } },
          ];
        default:
          return { match_all: {} };
      }
    };

    const fetchData = async () => {
      const queryBody = getQueryForLifestyle(selectedLifestyle);
      console.log(queryBody);
      try {
        const response = await axios.post(
          "https://kibana.nalraon.kr:9200/merged_data/_search",
          {
            _source: ["지역"],
            query: {
              bool: {
                should: queryBody,
              },
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `ApiKey ${ElasticAPIKey}`,
            },
          }
        );

        const regions = response.data.hits.hits.map((item) => ({
          [item._source.지역]: item._score,
        }));
        dispatch(setDistricts(regions));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (selectedLifestyle) {
      fetchData();
    } else {
      axios.post(
        "https://kibana.nalraon.kr:9200/merged_data/_search",
        {
          _source: ["지역"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${ElasticAPIKey}`,
          },
        }
      );
    }
  }, [selectedLifestyle]);

  return <div></div>;
};

export default Elastic;
