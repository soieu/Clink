import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pig from '../assets/pig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FindId.scss';
import { Link } from 'react-router-dom';

const FindId = () => {
  return (
    <div className="FindIdContainer">
      <div className="FindIdImage">
        <img src={pig} alt="logo" />
      </div>
      <div className="FindIdBox">
        <div className="FindIdTitle">아이디찾기</div>
        <div className="FindIdForm">
          <form action="findId.do" method="post">
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
        <div className="FindIdBtnBox">
          <Button variant="primary" className="FindIdSubmitBtn" type="submit">
            확인
          </Button>
          <Link to="/find-pwd">
            <div
              variant="primary"
              className="FindIdSubmitBtn"
              id="FindIdGotoPwd"
            >
              비밀번호 찾기
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

export default FindId;
