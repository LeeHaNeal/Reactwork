// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Main from './page/main';
import Calories from './page/calories';
import Challenge from './page/challenge';
import Exercise from './page/exercise';
import Community from './page/community';
import Calendar from './page/calendar';
import MyInfo from './page/myinfo';
import Login from './page/login';
import SignUp from './page/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') {
      setIsLoggedIn(true);
    }
    setIsAuthLoaded(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  if (!isAuthLoaded) return <div>로딩 중...</div>;

  return (
    <Router>
      {isLoggedIn && (
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isAuthLoaded={isAuthLoaded}
        />
      )}
      <Routes>
        {/* ✅ 로그인 안됐으면 로그인 페이지, 로그인 됐으면 메인으로 이동 */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/main" replace /> : <Login setIsLoggedIn={handleLogin} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" replace />} />
        <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/" replace />} />
        <Route path="/calories" element={isLoggedIn ? <Calories /> : <Navigate to="/" replace />} />
        <Route path="/challenge" element={isLoggedIn ? <Challenge /> : <Navigate to="/" replace />} />
        <Route path="/exercise" element={isLoggedIn ? <Exercise /> : <Navigate to="/" replace />} />
        <Route path="/community" element={isLoggedIn ? <Community /> : <Navigate to="/" replace />} />
        <Route path="/myinfo" element={isLoggedIn ? <MyInfo /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
