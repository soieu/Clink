import React from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import '../../styles/community/CommunityHeader.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export default function CommunityHeader() {
  const navigate = useNavigate();
  return (
    <div className="HeaderContainer">
      <div className="HeaderContainerContent">
        <p>
          <ChevronLeft
            onClick={(event) => {
              event.stopPropagation();
              navigate(-1);
            }}
          ></ChevronLeft>
          &nbsp;커뮤니티
        </p>
      </div>
    </div>
  );
}
