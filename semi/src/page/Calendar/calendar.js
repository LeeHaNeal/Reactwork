import React, { useState } from 'react';
import './calendar.css';
import { Calendar as ReactCalendar } from 'react-calendar';  // react-calendar의 Calendar를 import

function CalendarPage() {  // Calendar 컴포넌트 이름을 CalendarPage로 변경
  const [value, setValue] = useState(new Date());

  return (
    <div style={{ padding: 20 }}>
      <ReactCalendar 
        onChange={setValue} 
        value={value} 
        calendarType="gregory"
        locale="ko-KR"  // 한국어 로케일을 사용하여 첫 번째 요일을 월요일로 설정
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            let day = date.getDay();
            // 월요일 시작을 위해 0을 일요일로 처리하고, 6을 토요일로 처리
            if (day === 0) day = 7; // 일요일을 7로 처리
            if (day === 7) {  // 일요일 스타일 적용
              return 'sunday';
            } else if (day === 6) {  // 토요일 스타일 적용
              return 'saturday';
            }
          }
          return null;
        }}
        
        tileContent={({ date, view }) =>
          view === 'month' ? (
            <div style={{ marginTop: 2, fontSize: '0.75rem', color: 'rgb(63, 82, 140)' }}>
              {/* 칼로리 합계 자리 */}
              0000 kcal
            </div>
          ) : null
        }
      />
    </div>
  );
}

export default CalendarPage;
