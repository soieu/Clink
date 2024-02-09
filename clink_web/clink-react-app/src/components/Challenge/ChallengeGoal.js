import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../styles/MainFrame.scss";
const ChallengeGoal = ({ value, max }) => {
  const completed = ((value / max) * 100).toFixed(1);

  return (
    <div className="ChallengeGoal">
      <div className="ChallengeGoalContent">
        <ProgressBar now={completed} label={`${completed}%`} className="pro" />
        <div id="ChallengeTodaysGoal">
          목표금액 {max?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 중{" "}
          {value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 사용
        </div>
      </div>
    </div>
  );
};

export default ChallengeGoal;
