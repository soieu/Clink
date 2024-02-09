import { useState } from "react";
import "../../styles/community/CommunityCategory.css";
import best from "../../assets/best.png";
import free from "../../assets/free.png";
import infoc from "../../assets/infoc.png";
import announcement from "../../assets/announcement.png";
import { Navigate, useNavigate } from "react-router-dom";
const dum = [
  {
    src: best,
    select: true,
  },
  {
    src: free,
    select: false,
  },
  {
    src: infoc,
    select: false,
  },
  {
    src: announcement,
    select: false,
  },
];
function Category() {
  //커뮤니티 페이지의 상단 카테고리
  const [contents, setContents] = useState(dum);
  const onClick = (src) => {
    setContents(
      contents.map((con) =>
        con.src === src ? { ...con, select: true } : { ...con, select: false }
      )
    );
  };
  const navigate = useNavigate();
  return (
    <div className="category">
      <h3 className="categoryTitle">카테고리</h3>
      <div className="categoryImg">
        <img
          onClick={() => {
            onClick(contents[0].src);
            navigate("/community/posts?category_no=0&filter=1"); //카테고리 번호와 필터를 함께 보냄
          }}
          className="contentIcon"
          src={best}
          alt="best"
        />
        <img
          onClick={() => {
            onClick(contents[1].src);
            navigate("/community/posts?category_no=1&filter=1");
          }}
          className="contentIcon"
          src={free}
          alt="best"
        />
        <img
          onClick={() => {
            onClick(contents[2].src);
            navigate("/community/posts?category_no=2&filter=1");
          }}
          className="contentIcon"
          src={infoc}
          alt="best"
        />
        <img
          onClick={() => {
            onClick(contents[3].src);
            navigate("/community/posts?category_no=3&filter=1");
          }}
          className="contentIcon"
          src={announcement}
          alt="best"
        />
      </div>
    </div>
  );
}
export default Category;
