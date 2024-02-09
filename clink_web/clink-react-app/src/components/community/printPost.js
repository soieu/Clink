import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import axios from "axios";
const PrintPost = ({ list, i }) => {
  const [isLike, setIsLike] = useState(false);

  const navigate = useNavigate();
  const baseurl =
    "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/post/like";
  const parameterurl =
    "?user_id=" +
    sessionStorage.getItem("user_id") +
    "&board_no=" +
    list.board_no;
  axios
    .get(baseurl + parameterurl)
    .then(function (response) {
      setIsLike(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  const clickPost = (list) => {
    navigate("post?board_no=" + list.board_no);
  };
  return (
    <li className="li" onClick={() => clickPost(list)}>
      <b className="listNum">{i + 1}</b>
      <b className="boardTi" style={{ overflow: "hidden" }}>
        {list.board_title}
      </b>
      &nbsp; &nbsp;
      {list.board_title !== "게시물이 존재하지 않습니다." ? (
        <>
          {!isLike ? <Heart /> : <HeartFill style={{ color: "red" }} />}
          &nbsp;
          <b className="Like">{list.board_like_count}</b>
        </>
      ) : (
        ""
      )}
    </li>
  );
};
export default PrintPost;
