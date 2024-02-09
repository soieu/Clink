import React from 'react';
import '../../styles/community/CommunityPostButton.scss';
import { PencilSquare } from 'react-bootstrap-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function CommunityPostButton() {
  const navigate = useNavigate();
  return (
    <button
      className="CommunityPostButton"
      onClick={(event) => {
        event.stopPropagation();
        navigate('/community/writing');
      }}
    >
      <PencilSquare style={{ width: 25, height: 25 }} />
    </button>
  );
}
