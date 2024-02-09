import React, { useState, useEffect } from "react";
import "../../styles/community/CommunityPost.scss";
import {
  Heart,
  ChatDots,
  Eye,
  HeartFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import Logo from "../../assets/pig.png";
import Button from "react-bootstrap/Button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdditionalButton from "./AdditionalButton";
import axios from "axios";
import timestampParse from "../common/timestampParse";

export default function CommunityPost({ post, commentCount }) {
  const {
    board_title,
    board_no,
    board_content,
    register_datetime,
    register_id,
    board_like_count,
    hashtag_content,
    board_views,
  } = post || {}; // 구조 분해할 때 기본값으로 빈 객체를 사용

  const navigate = useNavigate();
  const location = useLocation();
  const [like, setLike] = useState(board_like_count);
  const [isLike, setIsLike] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [view, setView] = useState(false);
  const [imgURL, setImgURL] = useState(null);

  const baseurl =
    "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/post/like";
  const parameterurl =
    "?user_id=" + sessionStorage.user_id + "&board_no=" + post.board_no;
  const likeupurl = "/insert";
  const likedownurl = "/delete";

  useEffect(() => {
    if (
      register_id === sessionStorage.user_id &&
      location.pathname === "/community/post"
    ) {
      setIsMine(true);
    }

    //좋아요 체크
    axios
      .get(baseurl + parameterurl)
      .then(function (response) {
        setIsLike(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isMine, isLike, like]);

  const clickLike = (event) => {
    event.stopPropagation();

    if (isLike === 0) {
      axios.post(baseurl + likeupurl + parameterurl).then((response) => {
        setIsLike(true);
        setLike(like + 1);
      });
    } else {
      axios.post(baseurl + likedownurl + parameterurl).then((response) => {
        setIsLike(false);
        setLike(like - 1);
      });
    }
    setIsLike(!isLike);
  };

  const postHash = () => {
    const list = [];
    if (hashtag_content !== undefined) {
      const hashlist = hashtag_content.split(",");
      for (let i = 0; i < hashlist.length; i++) {
        list.push(
          <Button
            variant="primary"
            size="sm"
            key={i}
            style={{ marginRight: "5px" }}
          >
            {"#" + hashlist[i]}
          </Button>
        );
      }
    }
    return list;
  };
  return (
    <>
      <div
        className="CommunityPostContainer"
        onClick={(event) => {
          event.stopPropagation();
          navigate("/community/post?board_no=" + board_no);
        }}
      >
        <div className="CommunityPostTags">{postHash()}</div>
        <div className="CommunityPost">
          <div className="PostProfileDiv">
            <div className="CommunityPostProfile">
              <div className="CommunityPostProfileImg">
                {imgURL !== null ? <p></p> : <img src={Logo} alt="Profile" />}
              </div>
              <div className="CommunityPostProfileText">
                <p className="CommunityPostProfileNickname">{board_title}</p>
                <p className="CommunityPostProfileTime">
                  {timestampParse(register_datetime)}
                </p>
              </div>
            </div>

            <div className="menu">
              {isMine && (
                <ThreeDotsVertical
                  onClick={(event) => {
                    setView(!view);
                    event.stopPropagation();
                  }}
                />
              )}
              {view && (
                <AdditionalButton register_id={register_id}></AdditionalButton>
              )}
            </div>
          </div>
          <br />
          <div className="CommunityPostContent">{board_content}</div>
          <br />
        </div>

        <div className="CommunityPostInfo">
          <button onClick={clickLike}>
            {isLike ? <HeartFill style={{ color: "red" }} /> : <Heart />}
            &nbsp;좋아요 {like}
          </button>
          <button>
            <ChatDots />
            &nbsp;댓글 {commentCount}
          </button>
          <button>
            <Eye />
            &nbsp;조회 {board_views}
          </button>
        </div>
      </div>
    </>
  );
}
