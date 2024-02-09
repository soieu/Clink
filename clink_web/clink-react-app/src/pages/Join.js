import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Join.scss";
import { Link } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user_name: "",
    user_id: "",
    nick_name: "",
    password: "",
    confirmPwd: "",
    email: "",
    emailAuthNum: "",
  });
  const [authcode, setAuthcode] = useState("");
  const [warningPwd, setWarningPwd] = useState("");
  const [warningId, setWarningId] = useState("");
  const [warningEmail, setWarningEmail] = useState("");
  const [checkId, setCheckId] = useState("");
  const [checkEmail, setCheckEmail] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (userInfo.password !== userInfo.confirmPwd) {
      setWarningPwd("비밀번호가 일치하지 않습니다.");
    } else {
      setWarningPwd("비밀번호가 일치합니다.");
    }
    if (authcode.trim() !== userInfo.emailAuthNum.trim()) {
      setWarningEmail("인증번호가 일치하지 않습니다.");
    } else {
      setWarningEmail("");
    }
    let id = { user_id: userInfo.user_id };
    axios
      .post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/check-duplicate-id.do",
        id
      )
      .then((response) => {
        if (response.data === "success") {
          setWarningId("사용할 수 있는 아이디입니다.");
          setCheckId(1);
        } else if (response.data === "fail") {
          setWarningId("사용 중인 아이디입니다.");
          setCheckId(0);
        }
      })
      .catch((error) => {
        console.log(error);
        setWarningId("다시 시도하세요");
      });
  }, [
    userInfo.password,
    userInfo.confirmPwd,
    userInfo.emailAuthNum,
    authcode,
    userInfo.user_id,
  ]);

  // 이메일 인증
  function handleEmailAuth() {
    alert(`${userInfo.email}로 인증번호가 전송되었습니다.`);
    let email = { params: { email: userInfo.email } };
    axios
      .post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/emailAuth.do",
        {},
        email
      )
      .then((response) => {
        if (response.data) {
          setAuthcode(response.data.trim());
        } else {
          setWarningEmail("이메일 인증이 완료되지않았습니다.");
          // setUserInfo((prev) => ({ ...prev, email: "", }));
        }
      })
      .catch((error) => {
        console.log(error);
        setWarningId("다시 시도하세요");
      });
  }

  // 회원가입
  function handleSubmit(e) {
    // e.preventDefault();
    if (userInfo.user_id.trim() === "") {
      alert("아이디를 입력해주세요.");
    } else if (userInfo.password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (userInfo.user_name.trim() === "") {
      alert("이름을 입력해주세요.");
    } else if (userInfo.confirmPwd.trim() === "") {
      alert("비밀번호 확인을 입력해주세요.");
    } else if (userInfo.email.trim() === "") {
      alert("이메일 주소를 입력해주세요");
    } else if (authcode.trim() !== userInfo.emailAuthNum.trim()) {
      alert("이메일 인증번호를 확인해주세요.");
    } else {
      if (checkId == 1) {
        var param = {
          user_name: userInfo.user_name,
          user_id: userInfo.user_id,
          nick_name: userInfo.nick_name,
          password: userInfo.password,
          confirmPwd: userInfo.confirmPwd,
          email: userInfo.email,
        };

        axios
          .post(
            "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/user/join.do",
            param
          )
          .then((response) => {
            if (response.data) {
              sessionStorage.setItem("user_no", response.data.user_no);
              alert("회원가입 되었습니다. 로그인해주세요.");
              navigate("/");
            } else {
              alert("다시 시도하세요");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("회원가입에 실패했습니다.");
          });
      } else {
        alert("사용 중인 아이디입니다.");
        setUserInfo((prev) => ({
          ...prev,
          user_id: "",
        }));
      }
    }
  }
  return (
    <div className="JoinContainer">
      <div id="backgroundCircle"></div>
      <form action="join.do" method="post">
        <div className="JoinTitle">
          <h1>회원가입</h1>
        </div>
        <div className="JoinInputBox">
          <Form.Control
            name="user_name"
            placeholder="이름*"
            className="joinInput"
            value={userInfo.user_name}
            onChange={handleInputChange}
          />
          <div></div>
          <InputGroup className="joinInput">
            <Form.Control
              name="user_id"
              placeholder="아이디*"
              value={userInfo.user_id}
              onChange={handleInputChange}
            />
          </InputGroup>
          <div>{warningId}</div>
          <Form.Control
            name="nick_name"
            placeholder="닉네임"
            className="joinInput"
            value={userInfo.nick_name}
            onChange={handleInputChange}
          />
          <div></div>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호*"
            className="joinInput"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <div></div>
          <Form.Control
            type="password"
            name="confirmPwd"
            placeholder="비밀번호 확인*"
            className="joinInput"
            value={userInfo.confirmPwd}
            onChange={handleInputChange}
          />
          <div>{warningPwd}</div>
          <InputGroup className="joinInput">
            <Form.Control
              placeholder="이메일*"
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
            <Button
              variant="outline-secondary"
              id="JoinIdentifyBtn"
              onClick={() => handleEmailAuth()}
            >
              본인인증하기
            </Button>
          </InputGroup>
          <div></div>
          <Form.Control
            className="joinInput"
            type="text"
            name="emailAuthNum"
            placeholder="인증번호*"
            maxLength="8"
            value={userInfo.emailAuthNum}
            onChange={handleInputChange}
          />
        </div>
        <div>{warningEmail}</div>
      </form>
      <div className="JoinBtnBox">
        <Button
          variant="primary"
          className="LoginSubmitBtn"
          type="submit"
          onClick={() => handleSubmit()}
          onChange={handleInputChange}
        >
          회원가입하기
        </Button>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="JoinLoginBtn">로그인</div>
      </Link>
    </div>
  );
};

export default Join;
