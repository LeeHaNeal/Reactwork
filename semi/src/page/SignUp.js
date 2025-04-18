import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users", form);
      console.log("등록 성공:", response.data);
      alert("회원 등록 성공!");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("회원 등록 실패 ㅠㅠ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userId" placeholder="ID" onChange={handleChange} required />
      <input name="passwordHash" placeholder="비밀번호" onChange={handleChange} required />
      <input name="name" placeholder="이름" onChange={handleChange} required />
      <select name="gender" onChange={handleChange}>
        <option value="M">남자</option>
        <option value="F">여자</option>
      </select>
      <input name="birthDate" type="date" onChange={handleChange} />
      <input name="height" type="number" placeholder="키(cm)" onChange={handleChange} />
      <input name="weight" type="number" placeholder="현재 몸무게(kg)" onChange={handleChange} />
      <input name="goalWeight" type="number" placeholder="목표 몸무게(kg)" onChange={handleChange} />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;
