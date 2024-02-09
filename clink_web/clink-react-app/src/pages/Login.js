import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import pig from "../assets/pig.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [challengeCheck, setChallengeCheck] = useState(0);

  // 엔터키 이벤트
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleLoginSubmit();
    }
  };

  // 로그인
  const handleLoginSubmit = async () => {
    if (user_id.trim() === "" || password.trim() === "") {
      setUser_id("");
      setPassword("");
      alert("아이디 또는 패스워드를 입력해주세요");
    } else {
      //토큰을 생성할 파라미터
      var param = {
        mid: "t3",
        mpw: "t3",
      };

      const res = await axios.post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/login.do",
        {
          user_no: sessionStorage.getItem("user_no"),
          user_id: user_id,
          password: password,
        }
      );
      if (res.data) {
        sessionStorage.setItem("user_no", res.data.user_no);
        sessionStorage.setItem("user_id", res.data.user_id);
        sessionStorage.setItem("nick_name", res.data.nick_name);
        if (
          res.data.challengeDetails === null ||
          res.data.challengeDetails === ""
        ) {
          console.log("등록된 챌린지 없음");
          setChallengeCheck(0);
        } else {
          console.log("등록된 챌린지 있음");
          setChallengeCheck(1);
        }
        alert(sessionStorage.getItem("user_id") + " 로그인되었습니다.");

        // jwt 발급용
        const response = await axios.post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/generateToken",
          param
        );
        if (!response.data) {
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/mypage");
        }
      } else {
        alert("회원가입이 필요합니다.");
        navigate("/join");
        // setUser_id("");
        // setPassword("");
      }
    }
  };

  return (
    <div className="LoginContainer">
      <div className="LoginImage">
        <img src={pig} alt="logo" />
      </div>
      <div className="LoginTitle">
        <h2>로그인</h2>
      </div>
      <form action="login.do" method="post">
        <div className="LoginForm">
          <Form.Control
            type="text"
            id="inputPassword5"
            value={user_id}
            placeholder="아이디"
            onChange={(e) => {
              setUser_id(e.target.value);
            }}
          />
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => handleEnterKey(e)}
          />
        </div>
      </form>
      <div className="joinNfindBox">
        <button className="LoginJoinBtn">
          <Link to="/join">회원가입</Link>
        </button>
        <button className="LoginFindBtn">
          <Link to="/find-id">아이디/비밀번호 찾기</Link>
        </button>
      </div>
      <div className="LoginButtonBox">
        <Button
          className="LoginSubmitBtn"
          type="submit"
          onClick={() => handleLoginSubmit()}
        >
          로그인하기
        </Button>
      </div>
    </div>
  );
};

export default Login;
