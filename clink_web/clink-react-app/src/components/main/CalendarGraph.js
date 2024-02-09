// yarn add @nivo/calendar
import { ResponsiveTimeRange } from "@nivo/calendar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CalendarGraph = ({ data, continuesDate }) => {
  //console.log(data);
  return (
    <div className="main-calendarGraph">
      <b>현재 {continuesDate}일 연속으로 목표 달성중입니다.</b>
      <ResponsiveTimeRange
        data={data.streakData}
        weekdayTicks={[]} //
        weekdayLegendOffset={0} //
        from={data.from} //"2015-03-01"
        to={data.to} //"2016-07-12"
        emptyColor="#eeeeee"
        colors={["#FFD639", "#FFE400", "#FFC107", "#FF8A05"]}
        margin={{ top: 40, right: 20, bottom: 0, left: 20 }}
        yearSpacing={50}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
};

export default CalendarGraph;
