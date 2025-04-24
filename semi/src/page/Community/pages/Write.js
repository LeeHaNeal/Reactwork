import React, { useState } from "react";
import axios from "axios";
import './Write.css';
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      user: { userId },
    };

    axios
      .post("http://localhost:8080/posts", postData)
      .then((response) => {
        console.log("게시글 작성 성공:", response.data);
        navigate("/Community");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          console.error("사용자가 존재하지 않습니다.");
        } else {
          console.error("게시글 작성 실패:", error);
        }
      });
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
        />
        <textarea
          className="write-textarea"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="write-input"
          type="text"
          placeholder="사용자ID를 입력해주세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="write-button-group">
          <button
            type="button"
            className="write-button reset"
            onClick={() => {
              setTitle("");
              setContent("");
              setUserId("");
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
