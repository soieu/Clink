import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import account from "../../assets/account.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bankCategory from "../../dataCode/bankCategory.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddAccountForm.scss";
import { getAuthHeader } from "../common/JwtAuth";

const AddAccountUpdate = () => {
  const navigate = useNavigate();
  const [account_no, setAccount_no] = useState("");
  const [bank_code, setBank_code] = useState("");

  // 은행 선택
  let bankSelect = [];
  for (let i = 0; i < 18; i++) {
    bankSelect.push(
      <option value={i} key={i}>
        {bankCategory.bank[i]}
      </option>
    );
  }

  // 계좌 등록
  function AddAccountUpdateHandler() {
    if (account_no.length < 12) {
      alert("계좌번호를 다시 확인해주세요");
    } else if (isNaN(account_no)) {
      alert("계좌번호에 문자가 포함되어 있습니다.");
    } else if (bank_code === null || bank_code === "") {
      alert("은행을 선택해주세요");
    } else {
      axios
        .post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/update-account.do",
          {
            account_no: account_no,
            user_no: sessionStorage.getItem("user_no"),
            bank_code: bank_code,
            account_code: 1,
          },
          { headers: getAuthHeader() }
        )
        .then((response) => {
          if (response.data === 1) {
            alert("계좌가 수정되었습니다.");
            navigate("/mypage");
          } else {
            alert("계좌가 정상적으로 수정되지 않았습니다. ");
            setAccount_no("");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("계좌가 정상적으로 수정되지 않았습니다.");
        });
    }
  }

  return (
    <div className="AddAccountForm">
      <div className="AddAccountFormImage">
        <img src={account} alt="logo" />
      </div>
      <div className="AddAccountFormBox">
        <div className="AddAccountFormTitle">계좌수정</div>
        <div className="AddAccountFormForm">
          <form action="registAccount.do" method="post">
            <Form.Select
              aria-label="Default select example"
              value={bank_code}
              onChange={(e) => setBank_code(e.target.value)}
            >
              {bankSelect}
            </Form.Select>
            <br />
            <Form.Control
              type="text"
              id="inputPassword5"
              name="accountNum"
              placeholder="계좌번호 ( '-' 제외)"
              onChange={(e) => {
                setAccount_no(e.target.value);
              }}
              value={account_no}
            />
          </form>
        </div>
        <div className="AddAccountFormBtnBox">
          <Button
            onClick={() => AddAccountUpdateHandler()}
            variant="primary"
            className="AddAccountFormSubmitBtn"
            type="submit"
          >
            확인
          </Button>
          <div className="AddAccountFormCancleBtn" onClick={() => navigate(-1)}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountUpdate;
