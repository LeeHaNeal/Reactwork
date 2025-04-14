import React from 'react';
import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      {diaryList.length === 0 ? (
        <div className="empty-message">일기가 없습니다.</div>
      ) : (
        diaryList.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
          />
        ))
      )}
    </div>
  );
};

export default DiaryList;
