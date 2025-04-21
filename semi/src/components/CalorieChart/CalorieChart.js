// src/components/CalorieChart/CalorieChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 필요한 Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CalorieChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error('유효한 userId가 없습니다.'); // userId가 없으면 요청을 하지 않음
      return;
    }

    fetch(`http://localhost:8080/users/${userId}/calories`) // 서버에서 섭취 칼로리와 운동 칼로리 데이터를 받는 API 예시
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const labels = data.map(item => item.date); // x축: 날짜
          const caloriesConsumed = data.map(item => item.caloriesConsumed); // 섭취 칼로리
          const caloriesBurned = data.map(item => item.caloriesBurned); // 운동 칼로리

          setChartData({
            labels,
            datasets: [
              {
                label: '섭취 칼로리',
                data: caloriesConsumed,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
              {
                label: '운동 칼로리',
                data: caloriesBurned,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
              },
            ],
          });
        } else {
          console.error("서버에서 받은 데이터가 배열이 아닙니다:", data);
        }
      })
      .catch(err => {
        console.error('데이터를 불러오는 데 실패했습니다.', err);
      });
  }, [userId]); // userId가 변경될 때마다 데이터를 다시 불러옵니다.

  if (!chartData) return <div>로딩 중...</div>; // 차트 데이터가 로드되지 않았으면 로딩 중 메시지

  return (
    <div>
      <h3>칼로리 차트</h3>
      <Line data={chartData} options={{ responsive: true }} /> {/* 동적으로 데이터를 반영한 차트 렌더링 */}
    </div>
  );
};

export default CalorieChart;
