import React, { useState } from "react";
import axios from "axios";
import './Write.css';
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // 🔐 로그인된 사용자 ID

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/posts", {
        title,
        content,
        userId,
        passwordHash: password,
      });

      console.log("게시글 작성 성공:", response.data);
      alert("게시글이 등록되었습니다.");
      navigate("/community");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("비밀번호가 올바르지 않습니다.");
      } else {
        console.error("게시글 작성 실패:", error);
        alert("서버 오류로 인해 작성이 실패했습니다.");
      }
    }
  };

  return (
    <div className="write-container">
      <h1 className="write-title-header">게시글 작성</h1>
      <form onSubmit={handleSubmit} className="write-form">
        <input
          className="write-input"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="write-textarea"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          className="write-input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="write-button-group">
          <button
            type="button"
            className="write-button reset"
            onClick={() => {
              setTitle("");
              setContent("");
              setPassword("");
            }}
          >
            초기화
          </button>
          <button type="submit" className="write-button submit">
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
