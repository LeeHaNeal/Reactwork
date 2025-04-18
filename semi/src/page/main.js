import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => {
          console.error("사용자 정보를 불러오는 데 실패했습니다.", err);
        });
    } else {
      console.warn("userId 없음");
    }
  }, []);

  if (!user) return <div>로딩 중...</div>;

  const remainingCalories = (user.caloriesConsumed || 0) - (user.caloriesBurned || 0);

  return (
    <div className="main-container">
      <div className="user-info">
        키 : {user.height}cm | 현재 몸무게 : {user.weight}kg | 목표 몸무게 : {user.goalWeight}kg | 도전 점수 : {user.challengeScore}점 | 잔여 칼로리 : {remainingCalories}kcal
      </div>

      <img src="/tiger.png" alt="호랑이" style={{ width: '150px' }} />

      <div className="charts">
        <div>
          <h4>섭취 칼로리</h4>
          <img src="/calories-graph.png" alt="섭취 칼로리" />
        </div>
        <div>
          <h4>운동 칼로리</h4>
          <img src="/exercise-graph.png" alt="운동 칼로리" />
          <p>🔥 총 소모 칼로리: {user.caloriesBurned || 0} kcal</p>
        </div>
      </div>

      <div>
        오늘 한 운동 :
        <img src="/icon1.png" alt="운동1" />
        <img src="/icon2.png" alt="운동2" />
        <img src="/icon3.png" alt="운동3" />
      </div>
    </div>
  );
};

export default Main;
