import React, { useEffect, useState } from "react";
import "../../styles/community/AdditionalButton.scss";
import axios from "axios";

export default function AdditionalButton({
  target_comment_id,
  isMine,
  setParentCommentId,
  isReply,
}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    var deleteOk = confirm("정말로 댓글을 삭제하겠습니까?");
    if (deleteOk) {
      await axios
        .post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/post/comment/delete",
          null,
          {
            params: {
              comment_id: target_comment_id,
            },
          }
        )
        .then((response) => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const replySet = (e) => {
    setParentCommentId(target_comment_id);
  };

  return (
    <>
      <ul
        className="sub"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {isMine && (
          <li href="#" onClick={handleDelete}>
            댓글 삭제
          </li>
        )}
        {!isReply && (
          <li href="#" onClick={replySet}>
            대댓글 입력
          </li>
        )}
      </ul>
    </>
  );
}
