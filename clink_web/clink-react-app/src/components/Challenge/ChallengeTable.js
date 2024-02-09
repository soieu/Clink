import React from "react";

import moment from "moment";
import ChallengeTableCard from "./ChallengeTableCard";
import category from "../../dataCode/expenseCategory.json";

const ChallengeTable = ({ date, detail, openModal }) => {
  // const forceUpdate =React.useCallback(()=>updateS)
  // 카드 생성
  const result = [];

  // 오늘날짜인지 확인
  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderingCard = () => {
    for (let i = 0; i < detail.length; i++) {
      result.push(
        <ChallengeTableCard
          key={detail[i].transaction_datetime}
          datetime={detail[i].transaction_datetime}
          description={detail[i].transaction_info_content}
          category={category.category[Number(detail[i].transaction_code)]}
          amount={detail[i].transaction_amount}
          className="tableCard"
          update={isSameDate(
            new Date(),
            new Date(detail[i].transaction_datetime)
          )}
          openModal={openModal}
        />
      );
    }
  };
  //getData();
  //console.log(detail);
  renderingCard();
  //console.log(renderingCard());
  return (
    <div className="ChallengeTable">
      <div id="SelectedDate">
        {moment(date[0]).format("MM월 DD일")} ~{" "}
        {moment(date[1]).format("MM월 DD일")}
      </div>
      {result}
    </div>
  );
};

export default ChallengeTable;
