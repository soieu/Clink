import React, { useEffect, useState } from "react";
import "../../styles/common/Footer.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const Footer = ({ resources }) => {
  const [image, setImage] = useState(resources);
  const [lo, setLoc] = useState();
  const location = useLocation();
  useEffect(() => {
    setLoc(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <>
      <Outlet />
      <div className="FooterContainer">
        <div className="FooterBox">
          <div className="FooterIcon">
            <NavLink to="/Main" className="a" id="img1">
              <img
                src={lo === "Main" ? image[0].resrc : image[0].src}
                alt="logo"
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/challenge" className="a" id="img2">
              <img
                src={lo === "challenge" ? image[1].resrc : image[1].src}
                alt="logo"
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/community" className="a" id="img3">
              <img
                src={lo === "community" ? image[2].resrc : image[2].src}
                alt="logo"
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/mypage" className="a" id="img4">
              <img
                src={lo === "mypage" ? image[3].resrc : image[3].src}
                alt="logo"
              ></img>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
// 이동 링크달기

export default Footer;
