import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/challenge/Challenge.scss";
import ChallengeTitle from "../components/Challenge/ChallengeTitle";
import ChallengeGoal from "../components/Challenge/ChallengeGoal";
import Header from "../components/common/Header";
import ChallengeGraph from "../components/Challenge/ChallengeGraph";
import NoChallenge from "../components/register/NoChallenge/NoChallengeForm";
const Challenge = () => {
  const [ChallengeTitleText, setChallengeTitleText] = useState();
  const [ChallengeDescriptionText, setChallengeDescruotuibText] = useState();
  const [max, setMax] = useState();
  const [value, setValue] = useState();
  const [todayData, setTodayData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [checkChallenge, setCheckChallenge] = useState(false);
  useEffect(() => {
    const user_no = sessionStorage.getItem("user_no");
    const address =
      "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/challenge/main-info?userNo=" +
      user_no;
    //+sessionStorage.getItem("userNo");
    axios
      .get(address)
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          let chart = response.data.chart;
          setChallengeTitleText(response.data.title);
          setChallengeDescruotuibText(response.data.description);
          setMax(response.data.goal);
          setValue(response.data.value);
          setTodayData(response.data.today);
          setWeekData(chart);
          setCheckChallenge(true);
        } else {
          setCheckChallenge(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="Challenge" style={{ paddingBottom: "20%" }}>
      <div className="challengContent">
        {checkChallenge === true ? (
          <>
            <Header />
            <ChallengeTitle
              title={ChallengeTitleText}
              description={ChallengeDescriptionText}
            />
            <ChallengeGoal value={value} max={max} />
            <ChallengeGraph today={todayData} week={weekData} />
          </>
        ) : (
          <>{!checkChallenge && <NoChallenge />}</>
        )}
      </div>
    </div>
  );
};

export default Challenge;
