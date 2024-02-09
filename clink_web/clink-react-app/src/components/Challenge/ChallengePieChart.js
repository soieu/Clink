import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import category from '../../dataCode/expenseCategory.json';

const ChallengePieChart = ({ data }) => {
  const keys = Object.values(category.category);
  const data_dict = {};
  const result = [];
  //초기화
  keys.map((idx) => {
    data_dict[idx] = 0;
  });
  //합산
  data.map((d) => {
    keys.map((k) => {
      data_dict[k] = data_dict[k] + d[k];
    });
  });
  keys.map((k) => {
    let d = {};
    d['id'] = k;
    d['value'] = data_dict[k];
    result.push(d);
  });
  //console.log(result);
  return (
    <div className="ChallengeChart">
      <div id="ChartText"> 카테고리별 지출내역</div>
      <div id="Chart">
        <ResponsivePie
          data={result}
          /**Chart Margin */
          margin={{ top: 30, right: 80, bottom: 30, left: 80 }}
          /**Donut Size */
          innerRadius={0.4}
          /** pad 간격*/
          padAngle={15}
          /** pad radius 설정 (pad별 간격이 있을 시 보임)*/
          cornerRadius={1}
          /** chart 색상*/
          colors={[
            '#4292C6',
            '#6BAED6',
            '#9ECAE1',
            '#DBD778',
            '#DEEBF7',
            '#D1E2C4',
            '#B9C8BC',
            '#A0E0E4',
            '#B6E2D3',
          ]}
          /** link label 색상*/
          arcLinkLabelsTextColor="#000000"
        />
      </div>
    </div>
  );
};

export default React.memo(ChallengePieChart);
