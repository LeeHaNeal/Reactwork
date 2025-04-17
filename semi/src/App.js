import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';

import Calories from './page/calories';
import Challenge from './page/challenge';
import Exercise from './page/exercise';
import Community from './page/community';
import Calendar from './page/calendar';
import MyInfo from './page/myinfo';
import Login from './page/login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/calories" element={<Calories />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/community" element={<Community />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/myinfo"
          element={isLoggedIn ? <MyInfo /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
