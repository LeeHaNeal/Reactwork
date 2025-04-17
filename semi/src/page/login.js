import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 예시로 무조건 로그인 성공 처리
    setIsLoggedIn(true);
    navigate('/myinfo'); // 로그인 후 내정보 페이지로 이동
  };

  return (
    <div className="login-container">
    
      <div className="login-box">
       
        <div className="login-content">
          <div className="login-circle">
            로그인 후 이용가능합니다.
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>로그인</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <input type="password" />
            </div>
            <button className="login-button" type="submit">로그인</button>
            <button className="signup-button" type="button">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
