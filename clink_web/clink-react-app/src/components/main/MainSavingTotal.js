import { useState } from "react";
import SavingBackgroundImage from "../../images/mainCard.svg";
import SavingCoin from "../../images/mainCoin.svg";

const MainSavingTotal = ({ saving, totalSave }) => {
  let dayflag = 1;
  const [a, setA] = useState("어제");
  const [b, setB] = useState("전체");
  const [amount, setAmount] = useState(saving);

  const handleClickButton = (e) => {
    const target = e.target.parentNode;
    target.classList.toggle("main-card-rotate");
    setTimeout(() => {
      if (dayflag === 1) {
        dayflag = 0;
        setA("전체");
        setB("어제");
        setAmount(totalSave);
      } else {
        dayflag = 1;
        setA("어제");
        setB("전체");
        setAmount(saving);
      }
    }, 1300);
  };

  return (
    <div className="main-savingsYesterday" onClick={handleClickButton}>
      <div className="mainCoin" />
      <p
        style={{
          textAlign: "left",
          fontWeight: 700,
          padding: 10,
          height: "5%",
          color: "white",
        }}
      >
        {a} 저축 금액 {"\n"}
      </p>
      <p
        style={{
          textAlign: "left",
          padding: 10,
          height: "50%",
          fontSize: "30px",
          fontWeight: 700,
          color: "white",
        }}
      >
        {amount.toLocaleString()}원 {"\n"}
      </p>
      <p
        style={{
          textAlign: "left",
          padding: 5,
          height: "5%",
          fontSize: "11px",
          fontWeight: 500,
          color: "yellow",
        }}
      >
        {b} 저축액을 알고 싶으면 클릭해주세요 !
      </p>
    </div>
  );
};

export default MainSavingTotal;
