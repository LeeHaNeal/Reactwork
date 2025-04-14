// src/util/emotion-img.js

// 감정 이미지 불러오기
import emotion1 from '../resources/img/emotion1.png'; // 기쁨
import emotion2 from '../resources/img/emotion2.png'; // 슬픔
import emotion3 from '../resources/img/emotion3.png'; // 분노
import emotion4 from '../resources/img/emotion4.png'; // 두려움
import emotion5 from '../resources/img/emotion5.png'; // 당황
import emotion6 from '../resources/img/emotion6.png'; // 평온
import emotion7 from '../resources/img/emotion7.png'; // 놀람
import emotion8 from '../resources/img/emotion8.png'; // 질투

const emotionImgMap = {
  1: emotion1, // 기쁨
  2: emotion2, // 슬픔
  3: emotion3, // 분노
  4: emotion4, // 두려움
  5: emotion5, // 당황
  6: emotion6, // 평온
  7: emotion7, // 놀람
  8: emotion8  // 질투
};

export function getEmotionImg(emotionId) {
  return emotionImgMap[emotionId];
}
