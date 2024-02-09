import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pig from '../assets/pig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FindPwd.scss';
import { Link } from 'react-router-dom';

const FindPwd = () => {
  return (
    <div className="FindPwdContainer">
      <div className="FindPwdImage">
        <img src={pig} alt="logo" />
      </div>
      <div className="FindPwdBox">
        <div className="FindPwdTitle">비밀번호찾기</div>
        <div className="FindPwdForm">
          <form action="findPwd.do" method="post">
            <Form.Control
              type="text"
              id="inputPassword5"
              placeholder="아이디"
            />
            <Form.Control
              type="email"
              id="inputPassword5"
              placeholder="이메일"
            />
          </form>
        </div>
        <div className="FindPwdBtnBox">
          <Button variant="primary" className="FindPwdSubmitBtn" type="submit">
            확인
          </Button>
          <Link to="/find-id">
            <div
              variant="primary"
              className="FindPwdSubmitBtn"
              id="FindPwdGotoId"
            >
              아이디 찾기
            </div>
          </Link>
          <div className="JoinLoginBtn">
            <Link to="/">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPwd;
