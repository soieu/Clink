import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import category from "../../dataCode/expenseCategory.json";

const ChallengeBarChart = ({ data }) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const keys = Object.values(category.category);
  //console.log(data);
  data.map((idx) => {
    let date = new Date(idx.date);
    idx["date"] = week[new Date(date).getDay()];
    for (let i = 1; i < 10; i++) {
      idx[category.category[String(i)]] = idx["c" + i];
      //delete idx["c" + i];
    }
  });
  //console.log(data);
  return (
    <div className="ChallengeChart">
      <div id="ChartText"> 일주일 지출내역</div>
      <div id="Chart">
        <ResponsiveBar
          className="ResponsiveBar"
          /**data*/
          data={data}
          /**key */
          keys={keys}
          /**분류값 */
          indexBy="date"
          /** Char Margin */
          margin={{ top: 10, right: 90, bottom: 30, left: 10 }}
          /**Chart Padding */
          padding={0.1}
          /**Chart Color */
          colors={[
            "#4292C6",
            "#6BAED6",
            "#9ECAE1",
            "#DBD778",
            "#DEEBF7",
            "#D1E2C4",
            "#B9C8BC",
            "#A0E0E4",
            "#B6E2D3",
          ]}
          // 색상을 keys 요소들에 각각 적용
          colorBy="id"
          theme={{
            /** label style (bar에 표현되는 글씨)*/
            labels: {
              text: {
                fontSize: 11,
                fill: "#000000",
              },
            },
            /**legend style (default로 우측 하단에 있는 색상별 key 표시)*/
            legends: {
              text: {
                fontSize: 11,
                fill: "#000000",
              },
            },
            axis: {
              /**axis legend style (bottom, left에 있는 글씨)*/
              legend: {
                text: {
                  fontSize: 13,
                  fill: "#000000",
                },
              },
              /*** axis ticks style (bottom, left에 있는 값)*/
              ticks: {
                text: {
                  fontSize: 16,
                  fill: "#000000",
                },
              },
            },
          }}
          /** axis left 설정*/
          axisLeft={{
            tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
            tickPadding: 5, // tick padding
            tickRotation: 0, // tick 기울기
            legend: "price", // left 글씨
            legendPosition: "middle", // 글씨 위치
            legendOffset: -60, // 글씨와 chart간 간격
          }}
          /** label 안보이게 할 기준 width*/
          labelSkipWidth={20}
          /** legend 설정 (default로 우측 하단에 있는 색상별 key 표시)*/
          legends={[
            {
              dataFrom: "keys", // 보일 데이터 형태
              anchor: "bottom-right", // 위치
              direction: "column", // item 그려지는 방향
              justify: false, // 글씨, 색상간 간격 justify 적용 여부
              translateX: 120, // chart와 X 간격
              translateY: 0, // chart와 Y 간격
              itemsSpacing: 2, // item간 간격
              itemWidth: 100, // item width
              itemHeight: 20, // item height
              itemDirection: "left-to-right", // item 내부에 그려지는 방향
              itemOpacity: 0.85, // item opacity
              symbolSize: 20, // symbol (색상 표기) 크기
            },
          ]}
        />
      </div>
    </div>
  );
};

export default React.memo(ChallengeBarChart);
