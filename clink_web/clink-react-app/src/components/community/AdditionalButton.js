import React, { useEffect, useState } from "react";
import "../../styles/community/AdditionalButton.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

export default function AdditionalButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const target_board_no = Number(query.board_no) || 0;

  const handleDelete = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    var deleteOk = confirm("정말로 게시글을 삭제하겠습니까?");
    if (deleteOk) {
      await axios
        .post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/post/delete",
          null,
          {
            params: {
              board_no: target_board_no,
            },
          }
        )
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <ul
        className="sub"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <li
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            navigate("/community/post/update" + location.search);
          }}
        >
          &nbsp;글 수정
        </li>
        <li href="#" onClick={handleDelete}>
          &nbsp;글 삭제
        </li>
      </ul>
    </>
  );
}
