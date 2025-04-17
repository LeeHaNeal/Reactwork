// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // 선택사항: 스타일 분리하고 싶을 때

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="../App.js">홈</Link></li>
        <li><Link to="/calendar">캘린더</Link></li>
        <li><Link to="/calories">칼로리</Link></li>
        <li><Link to="/challenge">챌린지</Link></li>
        <li><Link to="/community">커뮤니티</Link></li>
        <li><Link to="/exercise">운동</Link></li>
        <li><Link to="/myinfo">내 정보</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
