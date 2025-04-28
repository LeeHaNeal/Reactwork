// 📁 page/Main/Main.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend ,Cell
} from 'recharts';
import './main.css';

const Main = () => {
  const [user, setUser] = useState(null);
  const [todayCalories, setTodayCalories] = useState(null);
  const [burnedCalories, setBurnedCalories] = useState(null);
  const [mealCalories, setMealCalories] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [exerciseTypes, setExerciseTypes] = useState([]);

  const mainCharacterImages = {
    "0": "/img/main1.png",
    "1": "/img/main2.png",
    "2": "/img/main3.png",
    "3": "/img/main4.png",
  };

  const typeIconMap = {
    유산소: "/img/img1.png",
    근력: "/img/img2.png",
    유연성: "/img/img3.png",
    일상활동: "/img/img4.png",
    균형감각: "/img/img5.png"
  };

  const getKSTDateString = () => {
    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return kst.toISOString().split('T')[0];
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    const today = getKSTDateString();

    axios.get(`http://localhost:8080/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("사용자 정보 불러오기 실패", err));

    axios.get(`http://localhost:8080/food-logs/${userId}?date=${today}`)
      .then(res => {
        const categorized = { breakfast: 0, lunch: 0, dinner: 0 };
        res.data.forEach(item => {
          const meal = item.MEAL_TIME || item.mealTime;
          const kcal = item.TOTAL_CALORIES || item.totalCalories || 0;

          const key =
            meal === "아침" ? "breakfast" :
            meal === "점심" ? "lunch" :
            meal === "저녁" ? "dinner" :
            null;

          if (key) categorized[key] += kcal;
        });
        setMealCalories(categorized);
        setTodayCalories(
          categorized.breakfast + categorized.lunch + categorized.dinner
        );
      })
      .catch(() => setTodayCalories(0));

    axios.get(`http://localhost:8080/users/${userId}/burned-calories`)
      .then(res => setBurnedCalories(res.data || 0))
      .catch(() => setBurnedCalories(0));

    axios.get(`http://localhost:8080/api/exercise-types/today`, {
      params: { userId }
    })
      .then(res => setExerciseTypes(res.data))
      .catch(err => {
        console.error("오늘 운동 타입 불러오기 실패", err);
        setExerciseTypes([]);
      });

  }, []);

  if (!user || todayCalories === null || burnedCalories === null) {
    return <div style={{ textAlign: 'center' }}>로딩 중...</div>;
  }

  const remainingCalories = todayCalories - burnedCalories;

  const chartData = [
    { name: '아침', kcal: mealCalories.breakfast },
    { name: '점심', kcal: mealCalories.lunch },
    { name: '저녁', kcal: mealCalories.dinner },
    { name: '운동', kcal: burnedCalories },
  ];
  
  
  
  

  return (
    <div className="main-container">
      <div className="user-info">
        키: {user.height}cm | 현재 몸무게: {user.weight}kg | 목표 몸무게: {user.goalWeight}kg |
        도전 점수: {user.challengeScore}점 | 🔥 잔여 칼로리: {remainingCalories}kcal
      </div>

      <img
        src={mainCharacterImages[user.profileImageUrl] || "/img/default.jpg"}
        alt="내 캐릭터"
        style={{ width: "300px", borderRadius: "16px", margin: "20px 0", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)" }}
      />

      <div className="graph-wrapper">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 800]} />
          <Tooltip />
          <Legend
              verticalAlign="top"
              align="right"
              content={() => (
                <div style={{
                  display: 'flex', justifyContent: 'flex-end',  marginBottom: '10px', fontSize: '13px',color: '#555', fontFamily: 'Noto Sans KR, Arial, sans-serif',
                   gap: '14px', paddingRight: '20px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#82ca9d', borderRadius: '50%', marginRight: '6px' }}></div>
                    식사
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#ff7f7f', borderRadius: '50%', marginRight: '6px' }}></div>
                    운동
                  </div>
                </div>
              )}
            />
          <Bar
            dataKey="kcal"
            radius={[10, 10, 0, 0]}
            isAnimationActive
            label={{ position: 'top', fontSize: 12, fill: '#555' }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === '운동' ? '#ff7f7f' : '#82ca9d'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      </div>

      <div className="charts">
        <div>
          <h4>오늘 섭취 칼로리</h4>
          <p>🍱 {todayCalories} kcal</p>
        </div>
        <div>
          <h4>운동 칼로리</h4>
          <p>🔥 총 소모 칼로리: {burnedCalories} kcal</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        오늘 한 운동:
        {exerciseTypes.map((type) => (
          <img
            key={type}
            src={typeIconMap[type] || "/icons/default.png"}
            alt={type}
            style={{ width: '40px', margin: '0 10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
