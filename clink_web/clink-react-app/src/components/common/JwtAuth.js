import axios from "axios";

// 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

// 토큰 재발급 함수
const callRefresh = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const tokens = { accessToken, refreshToken };
    const res = await axios.post(
      "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/refreshToken",
      tokens
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  } catch (error) {
    console.log(error);
    // 에러 처리 로직 추가
  }
};

export { getAuthHeader, callRefresh };
