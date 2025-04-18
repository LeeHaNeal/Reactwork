// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();         
    navigate('/login');    
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="logo">
          <Link to="/">🏃‍♀️ HealthMate</Link>
        </li>
        <li><Link to="/calendar">캘린더</Link></li>
        <li><Link to="/calories">칼로리</Link></li>
        <li><Link to="/challenge">챌린지</Link></li>
        <li><Link to="/community">커뮤니티</Link></li>
        <li><Link to="/exercise">운동</Link></li>
        <li><Link to="/myinfo">내 정보</Link></li>

        {!isLoggedIn && <li><Link to="/signup">회원가입</Link></li>}

        {!isLoggedIn ? (
          <li><Link to="/login">로그인</Link></li>
        ) : (
          <li><button onClick={onLogoutClick}>로그아웃</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
