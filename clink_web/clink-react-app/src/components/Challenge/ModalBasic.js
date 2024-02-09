import axios from "axios";
import moment from "moment";
import categoryCode from "../../dataCode/expenseCategory.json";

function ModalBasic({
  setModalOpen,
  setCardContent,
  strDate,
  description,
  amount,
  time,
  date,
  category,
}) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
    setCardContent(true);
  };

  //select box 내용
  let select = [];
  for (let i = 1; i < 10; i++) {
    select.push(
      <option value={Number(i)} key={Number(i)}>
        {categoryCode.category[Number(i)]}
      </option>
    );
  }

  //수정정보 전송
  function updateCard() {
    console.log("삭제");
    let newDescription = document.getElementById("description").value;
    let newAmount = document.getElementById("amount").value;
    let newCategory = "00" + document.getElementById("category").value;

    //삭제 전 확인
    if (window.confirm("정말 수정하시겠습니까?")) {
      var param = {
        user_no: "00000",
        transaction_datetime: moment(date).format("YYYY-MM-DD ") + time,
        transaction_info_content: newDescription,
        transaction_amount: newAmount,
        transaction_code: newCategory,
      };
      console.log(param);
      const address =
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/challenge/pay-update";

      axios
        .post(address, param)
        .then((response) => {
          //console.log(response);
          if (response.data) {
            alert("정상적으로 수정되었습니다.");
            window.location.reload();
          } else alert("잠시 후 다시 시도해주세요");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="updateModal">
      <div className="Card">
        <div className="CardTop">
          <div id="CardLeft">{strDate}</div>
          <div id="CardMiddle">
            <input id="description" defaultValue={description}></input>
          </div>
          <div id="CardRight">
            <input id="amount" defaultValue={amount}></input>
          </div>
        </div>
        <div className="CardBottom">
          <div id="CardLeft">{time}</div>
          <div id="CardMiddle">
            <select name="category" id="category" defaultValue={category}>
              {select}
            </select>
          </div>
          <div id="CardRight">
            <div id="CardUpdate" onClick={updateCard}>
              [확인]
            </div>
            <div id="CardDelete" onClick={closeModal}>
              [취소]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalBasic;
