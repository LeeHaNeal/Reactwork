import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import Main from './page/Main/main';          // 수정된 경로
import Calories from './page/Calories/calories'; // 수정된 경로
import Challenge from './page/Challenge/challenge'; // 수정된 경로
import Exercise from './page/Exercise/exercise'; // 수정된 경로
import Community from './page/Community/community';  // 수정된 경로
import Calendar from './page/Calendar/calendar';      // 수정된 경로
import MyInfo from './page/MyInfo/myinfo';     // 수정된 경로
import Login from './page/Login/login';        // 수정된 경로
import SignUp from './page/SignUp/SignUp';     // 수정된 경로

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

        <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={handleLogin} />} />
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
