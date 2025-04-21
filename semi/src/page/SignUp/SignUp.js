import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SignUp/SignUp.css";  // SignUp 스타일 적용

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    passwordHash: "",
    name: "",
    gender: "M",
    birthDate: "",
    height: "",
    weight: "",
    goalWeight: "",
  });

  const [selectedCharacter, setSelectedCharacter] = useState(null); // 선택된 캐릭터
  const [isIdValid, setIsIdValid] = useState(false); // ID 중복 확인 여부

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCharacterSelect = (index) => {
    setSelectedCharacter(index); // 선택된 캐릭터 인덱스를 저장
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${form.userId}`);
      if (response.data) {
        alert("이미 사용된 아이디입니다.");
        setIsIdValid(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsIdValid(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdValid) {
      alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users", form);
      console.log("등록 성공:", response.data);
      alert("회원 등록 성공!");

      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/main");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("회원 등록 실패 ㅠㅠ");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="userId" placeholder="ID" onChange={handleChange} required />
        <button type="button" id="checkIdBtn" onClick={handleIdCheck}>
          중복확인
        </button>
        <input name="passwordHash" placeholder="비밀번호" onChange={handleChange} required />
        <input name="name" placeholder="이름" onChange={handleChange} required />
        <select name="gender" onChange={handleChange}>
          <option value="M">남자</option>
          <option value="F">여자</option>
        </select>
        <input name="birthDate" type="date" onChange={handleChange} />
        
        {/* 키, 몸무게, 목표 몸무게 한 줄로 배치 */}
        <div className="input-group">
          <input name="height" type="number" placeholder="키(cm)" onChange={handleChange} />
          <input name="weight" type="number" placeholder="현재 몸무게(kg)" onChange={handleChange} />
          <input name="goalWeight" type="number" placeholder="목표 몸무게(kg)" onChange={handleChange} />
        </div>

        {/* 캐릭터 선택 부분 */}
        <div className="character-container">
          <img
            src="https://via.placeholder.com/70?text=Char1" // 예시 이미지 URL
            alt="Character 1"
            className={selectedCharacter === 0 ? "selected" : ""}
            onClick={() => handleCharacterSelect(0)}
          />
          <img
            src="https://via.placeholder.com/70?text=Char2" // 예시 이미지 URL
            alt="Character 2"
            className={selectedCharacter === 1 ? "selected" : ""}
            onClick={() => handleCharacterSelect(1)}
          />
          <img
            src="https://via.placeholder.com/70?text=Char3" // 예시 이미지 URL
            alt="Character 3"
            className={selectedCharacter === 2 ? "selected" : ""}
            onClick={() => handleCharacterSelect(2)}
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
