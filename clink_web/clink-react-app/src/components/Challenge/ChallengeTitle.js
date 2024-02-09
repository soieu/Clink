import React from "react";

const ChallengeTitle = ({ title, description }) => {
  return (
    <div className="ChallengeTitle">
      <div id="ChallengeTitle">{title}</div>
      <div id="ChallengeDescription">{description}</div>
    </div>
  );
};

export default ChallengeTitle;
