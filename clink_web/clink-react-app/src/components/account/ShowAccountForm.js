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

// 소비계좌
const ShowAccountForm = () => {
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

  function AddAccountHandler() {
    if (account_no.length < 12) {
      alert("계좌번호를 다시 확인해주세요");
    } else if (isNaN(account_no)) {
      alert("계좌번호에 문자가 포함되어 있습니다.");
    } else if (bank_code === null || bank_code === "") {
      alert("은행을 선택해주세요");
    } else {
      axios
        .post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/regist-account.do",
          {
            account_no: account_no,
            user_no: sessionStorage.getItem("user_no"),
            bank_code: bank_code,
            account_code: 2,
          },
          { headers: getAuthHeader() }
        )
        .then((response) => {
          if (response.data == 1) {
            alert("계좌가 등록되었습니다.");
          } else {
            alert("계좌가 정상적으로 등록되지 않았습니다. ");
          }
          navigate("/mypage");
        })
        .catch((error) => {
          console.log(error);
          alert("계좌가 정상적으로 등록되지 않았습니다.");
        });
    }
  }

  return (
    <div className="AddAccountForm">
      <div className="AddAccountFormImage">
        <img src={account} alt="logo" />
      </div>
      <div className="AddAccountFormBox">
        <div className="AddAccountFormTitle">계좌추가</div>
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
            onClick={() => AddAccountHandler()}
            variant="primary"
            className="AddAccountFormSubmitBtn"
            type="submit"
          >
            확인
          </Button>
          <div className="AddAccountFormCancleBtn" onClick={() => navigate(-1)}>
            취소
          </div>
          {/* 계좌번호 중복확인 검사 */}
        </div>
      </div>
    </div>
  );
};

export default ShowAccountForm;
