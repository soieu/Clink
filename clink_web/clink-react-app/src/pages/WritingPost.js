import React, { useState } from "react";
import "../styles/community/WritingPost.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CommunityHeader from "../components/community/CommunityHeader";
import WritingCategory from "../components/community/WritingCategory";
import PostTagInput from "../components/community/PostTagInput";
import axios from "axios";

export default function WritingPost() {
  const [inputPost, setInputPost] = useState({
    categoryNo: 1,
    title: "",
    content: "",
    tagList: [],
  });
  const insertPost = () => {
    const arr = [];
    for (let i = 0; i < inputPost.tagList.length; i++) {
      arr.push(inputPost.tagList[i].tagname);
    }
    let params = {
      board_title: inputPost.title,
      board_content: inputPost.content,
      category_no: inputPost.categoryNo,
      hashtag_content: arr.join(),
      user_no: sessionStorage.user_no,
      register_id: sessionStorage.user_id,
    };
    //trim 오류나서 우선 지우고 테스트중
    if (inputPost.title.trim() === "" || inputPost.content.trim() === "") {
      alert("제목 또는 내용을 입력해주세요!");
    } else {
      axios.post(
        "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/post/insert",
        params
      );
      window.location.href =
        "http://43.200.204.75:80/community/posts?category_no=" +
        inputPost.categoryNo +
        "&&filter=1";
    }
    //console.log(inputPost.tagList);
  };
  const onChange = (e) => {
    setInputPost({ ...inputPost, [e.target.classList[0]]: e.target.value });
  };
  return (
    <div className="WritingPost">
      <CommunityHeader></CommunityHeader>
      <WritingCategory
        inputPost={inputPost}
        setInputPost={setInputPost}
      ></WritingCategory>
      <Form>
        <Form.Group className="" controlId="formPost">
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            className="title"
            value={inputPost.title}
            onChange={onChange}
          />
          <br />
          <Form.Control
            className="content"
            as="textarea"
            rows={13}
            placeholder="내용을 입력하세요"
            value={inputPost.content}
            onChange={onChange}
          />
        </Form.Group>
        <PostTagInput
          inputPost={inputPost}
          setInputPost={setInputPost}
        ></PostTagInput>
        <Button
          // type="submit"
          onClick={() => {
            insertPost();
          }}
          style={{ width: "80%" }}
        >
          글 작성
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
