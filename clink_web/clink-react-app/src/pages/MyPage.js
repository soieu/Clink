import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pig from "../assets/pig.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AddAccount from "../components/account/AddAccount";
import ShowAccount from "../components/account/ShowAccount";
import bankCategory from "../dataCode/bankCategory.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MyPage.scss";
import { getAuthHeader, callRefresh } from "../components/common/JwtAuth";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    nickname: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [newfile, setNewfile] = useState("");

  const [addAccountNo, setAddAccountNo] = useState("");
  const [addAccountBankCode, setAddAccountBankCode] = useState("");
  const [showAccountNo, setShowAccountNo] = useState("");
  const [showAccountBankCode, setShowAccountBankCode] = useState("");

  useEffect(() => {
    // 계좌 정보불러오기
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw "Cannot Find Access Token";
    }
    const fetchData = async () => {
      try {
        const accountResponse = await axios.post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/check-account.do",
          { user_no: sessionStorage.getItem("user_no") },
          {
            headers: getAuthHeader(),
          }
        );
        for (let i = 0; i < accountResponse.data.length; i++) {
          if (accountResponse.data[i].account_code === "1") {
            setAddAccountNo(accountResponse.data[i].account_no);
            setAddAccountBankCode(
              bankCategory.bank[accountResponse.data[i].bank_code]
            );
          } else if (accountResponse.data[i].account_code === "2") {
            setShowAccountNo(accountResponse.data[i].account_no);
            setShowAccountBankCode(
              bankCategory.bank[accountResponse.data[i].bank_code]
            );
          } else {
          }
        }
        const userResponse = await axios.post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/mypage.do",
          { user_no: sessionStorage.getItem("user_no") },
          {
            headers: getAuthHeader(),
          }
        );
        setUserInfo({
          ...userInfo,
          id: userResponse.data.user_id,
          nickname: userResponse.data.nick_name,
          password: userResponse.data.password,
        });
      } catch (err) {
        if (err.response.data.msg === "Expired Token") {
          console.log("Refresh Your Token");
          // 토큰 유효기간이 만료되면 refreshToken 호출
          try {
            await callRefresh(); // refresh 토큰 발급
            console.log("new tokens....saved..");
            return accessToken();
          } catch (refreshErr) {
            throw refreshErr.response.data.msg;
          }
        } //end if
      }
    };
    fetchData();
  }, []);

  // 로그아웃(세션제거)
  function logoutHandler() {
    sessionStorage.clear();
    navigate("/");
  }

  // 개인정보 수정
  async function updateInfoHandler() {
    try {
      const param = {
        nick_name: userInfo.nickname,
        password: userInfo.password,
        user_no: sessionStorage.getItem("user_no"),
      };

      const response = await axios.post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/update.do",
        param,
        {
          headers: getAuthHeader(),
        }
      );

      if (response.data === "success") {
        alert("개인정보가 수정되었습니다.");
        setUserInfo({
          ...userInfo,
          nickname: userInfo.nickname,
          password: userInfo.password,
        });
        sessionStorage.setItem("nick_name", userInfo.nickname);
        sessionStorage.setItem("password", userInfo.password);
      } else if (response.data === "fail") {
        alert("정상적으로 처리되지 않았습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("다시 시도하세요");
    }
  }

  // 프로필 사진
  async function profileHandler() {
    try {
      const formData = new FormData(); // new FromData()로 새로운 객체 생성
      formData.append("user_no", sessionStorage.getItem("user_no"));
      formData.append("file", file);

      const response = await axios.post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/photo-url.do",
        formData,
        {
          headers: {
            ...getAuthHeader(), // 기존 헤더를 포함시킴
            "Content-Type": "multipart/form-data", // Content-Type 추가
          },
        }
      );
      if (response.data) {
        alert("프로필 사진이 수정되었습니다.");
        setNewfile(response.data);
      } else {
        alert("정상적으로 처리되지 않았습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("다시 시도하세요");
    }
  }

  // 로그아웃
  function logoutHandler() {
    sessionStorage.clear();
    window.localStorage.clear();
    navigate("/");
  }

  return (
    <div className="MyPageContainer" style={{ paddingBottom: "20%" }}>
      <div className="MyPageTitle">{userInfo.id} 마이페이지</div>
      <>
        <div className="MyPageProfileTitle">프로필 사진 등록</div>
        <div className="MyPageProfileBox">
          {newfile ? (
            <img
              src={`http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/home/ubuntu/property/img/${newfile}`}
              alt="logo"
            />
          ) : (
            <img src={require("../assets/pig.png")} alt="logo" />
          )}
          <div className="MyPageProfileBtnBox">
            <label htmlFor="file">
              <div className="MyPageProfileSelectBtn">파일 선택</div>
            </label>
            &nbsp; &nbsp;&nbsp;
            <input
              id="file"
              className="MyPageChoiceBtn"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button type="submit" onClick={() => profileHandler()}>
              확인
            </Button>
          </div>
        </div>
        <div className="MyPageAccounttitle">계좌등록</div>
        <AddAccount
          className="MyPageAddAccount"
          addAccountNo={addAccountNo}
          addAccountBankCode={addAccountBankCode}
        />
        <ShowAccount
          className="MyPageAddAccount"
          showAccountNo={showAccountNo}
          showAccountBankCode={showAccountBankCode}
        />
        <hr className="MypageHr" />
        <div className="MyPageInfotitle">개인정보 수정</div>
        <form action="update.do" method="post">
          <div className="MyPageInfoBox">
            <div className="MyPageLineBox">
              <div>닉네임</div>
              <Form.Control
                type="text"
                placeholder={`${userInfo.nickname}`}
                className="joinInput"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, nickname: e.target.value });
                }}
                value={userInfo.nickname}
              />
            </div>
            <div className="MyPageLineBox">
              <div>비밀번호</div>
              <Form.Control
                type="password"
                name="password"
                className="joinInput"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
                value={userInfo.password}
              />
            </div>
            <div className="MyPageLineBox">
              <div>비밀번호 확인</div>
              <Form.Control
                type="password"
                name="passwordConfirm"
                className="joinInput"
              />
            </div>
            <br />
          </div>
        </form>
        <div className="MyPageBtnBox">
          <Button type="submit" onClick={() => updateInfoHandler()}>
            수정
          </Button>
          <br />
          <br />
          <div onClick={() => logoutHandler()} style={{ cursor: "pointer" }}>
            <b>Logout</b>
          </div>
          <br />
        </div>
      </>
    </div>
  );
};

export default MyPage;
