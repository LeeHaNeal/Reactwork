import { useContext } from 'react';
import { DiaryStateContext } from '../App';
import DiaryList from '../components/DiaryList';
import Header from '../components/Header';
import { getEmotionImg } from '../util/emotion-img';

const emotionNames = {
  1: "기쁨",
  2: "슬픔",
  3: "분노",
  4: "두려움",
  5: "당황",
  6: "평온",
  7: "놀람",
  8: "질투"
};

const Home = () => {
  const data = useContext(DiaryStateContext);

  return (
    <div>
      <Header
        title={"2025년 4월 14일"}
        leftChild={<button>{"<"}</button>}
        rightChild={<button>{">"}</button>}
      />
      
      <DiaryList diaryList={data} />

      {/* 감정 이미지 그리드 */}
      <h4 style={{ marginTop: '30px' }}>감정 이미지 미리보기</h4>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        marginTop: "10px"
      }}>
        {Object.keys(emotionNames).map(id => (
          <div key={id} style={{ textAlign: "center" }}>
            <img src={getEmotionImg(id)} alt={emotionNames[id]} style={{ width: "70px" }} />
            <div>{emotionNames[id]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
