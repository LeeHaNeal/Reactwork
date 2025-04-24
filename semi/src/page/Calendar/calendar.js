import React, { useState, useEffect } from 'react';
import './calendar.css';
import Calendar from 'react-calendar';
import axios from 'axios';

function CalendarPage({ userId }) {
  const [value, setValue] = useState(new Date());
  const [caloriesData, setCaloriesData] = useState({});

  // 날짜 선택 시 해당 날짜의 칼로리 데이터를 가져오는 함수
  const fetchCaloriesForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
    axios
      .get(`http://localhost:8080/foods/total-calories?userId=${userId}&logDate=${formattedDate}`)
      .then((response) => {
        const totalCalories = response.data.reduce((sum, item) => sum + item.totalCalories, 0);
        setCaloriesData((prevData) => ({
          ...prevData,
          [formattedDate]: totalCalories,
        }));
      })
      .catch((error) => {
        console.error("총 칼로리 불러오기 실패", error);
      });
  };

  useEffect(() => {
    // 페이지 로드 시 오늘 날짜의 칼로리 정보를 불러옵니다.
    fetchCaloriesForDate(value);
  }, [value]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <Calendar
        onChange={setValue}
        value={value}
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const day = date.getDay();
            if (day === 6) {
              return 'saturday';
            }
          }
          return null;
        }}
        tileContent={({ date, view }) =>
          view === 'month' ? (
            <div
              style={{
                marginTop: 2,
                fontSize: '0.75rem',
                color: 'rgb(63, 82, 140)',
              }}
            >
              {/* 해당 날짜에 저장된 칼로리 값을 표시 */}
              {caloriesData[date.toISOString().split('T')[0]] || '0kcal'}
            </div>
          ) : null
        }
      />
    </div>
  );
}

export default CalendarPage;
