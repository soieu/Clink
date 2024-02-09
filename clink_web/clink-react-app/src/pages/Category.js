import React, { useEffect, useState } from "react";
import CommunityHeader from "../components/community/CommunityHeader";
import CommunityCategory from "../components/community/CategoryTab";
import CommunityFilter from "../components/community/CommunityFilter";
import CommunityPost from "../components/community/CommunityPost";
import CommunityPostButton from "../components/community/CommunityPostButton";
import "../styles/community/CommunityContainer.scss";
// import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../assets/Spinner-1s-200px.gif";
import { getAuthHeader, callRefresh } from "../components/common/JwtAuth";
export default function Community() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(1);
  const [hashtag, setHashtag] = useState("");
  const [categoryNo, setCategoryNo] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [ScrollY, setScrollY] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const lo = Number(new URLSearchParams(location.search).get("category_no"));
    setCategoryNo(lo);
    const fetchPosts = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 posts 를 초기화하고
        setError(null);
        setPosts(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/posts?category_no=" +
            lo +
            "&filter=" +
            filter +
            "&hashtag=" +
            hashtag
        );
        setPosts([...response.data]); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [location, filter, categoryNo, hashtag]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!posts) {
    return (
      //게시물이 없어서 일단 예외처리 해놓음
      <>
        <CommunityHeader></CommunityHeader>
        <CommunityCategory
          setFilter={setFilter}
          categoryNo={categoryNo}
        ></CommunityCategory>
        <CommunityFilter
          setFilter={setFilter}
          filter={filter}
          categoryNo={categoryNo}
        ></CommunityFilter>
        <h1>게시물이 존재하지 않습니다.</h1>
        <CommunityPostButton></CommunityPostButton>
      </>
    );
  } else {
    return (
      <div className="CommunityContainer">
        <CommunityHeader></CommunityHeader>
        <CommunityCategory
          setHashtag={setHashtag}
          filter={filter}
          setFilter={setFilter}
          categoryNo={categoryNo}
        ></CommunityCategory>

        <CommunityFilter
          setFilter={setFilter}
          filter={filter}
          setHashtag={setHashtag}
          categoryNo={categoryNo}
        ></CommunityFilter>

        {posts.map((post, id) => (
          <CommunityPost
            post={post}
            key={id}
            commentCount={post.comment_count}
          ></CommunityPost>
        ))}
        <CommunityPostButton></CommunityPostButton>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
