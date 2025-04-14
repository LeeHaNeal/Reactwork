import { getEmotionImg } from '../util/emotion-img';

const DiaryItem = ({ id, createDate, emotionId, content }) => {
  return (
    <div>
      <img src={getEmotionImg(emotionId)} alt={`감정${emotionId}`} />
      <h4>{new Date(createDate).toLocaleDateString()}</h4>
      <div>{content}</div>
    </div>
  );
};

export default DiaryItem;
