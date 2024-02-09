// import { useEffect, useState } from 'react';
import "../../styles/community/newsAPI.css";
function News({ idx, newsdata }) {
  return (
    <div>
      {newsdata && (
        <div className="newWrap">
          <a href={newsdata[idx].news_link} target="blank">
            <img src={newsdata[idx].news_img} alt={newsdata[idx].news_title} />
          </a>
          <p className="newsTitle">
            <b>{newsdata[idx].news_title}</b>
          </p>
        </div>
      )}
    </div>
  );
}
export default News;
