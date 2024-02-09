import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "../../styles/community/finInfo.css";
import News from "./newsAPI";
function FinInfo({ newsdata }) {
  const newsList = () => {
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push(
        <SwiperSlide className="news" key={i}>
          <News newsdata={newsdata} idx={i} />
        </SwiperSlide>
      );
    }
    return list;
  };
  return (
    <div className="finInfo">
      {/* <img src={testdata[0].news_img} alt="test"></img> */}
      <p className="finTitle">
        <b>금융뉴스</b>
      </p>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        loop={true}
      >
        {newsList()}
      </Swiper>
    </div>
  );
}
export default FinInfo;
