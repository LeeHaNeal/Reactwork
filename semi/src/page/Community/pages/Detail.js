import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReplyList from "../components/ReplyList";
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`http://localhost:8080/posts/${id}`, {
        data: { userId: currentUser }, // 🔥 중요
      })
        .then(() => {
          alert("삭제 완료되었습니다.");
          navigate("/community");
        })
        .catch((err) => {
          console.error("삭제 실패:", err);
          alert("삭제에 실패했습니다.");
        });
    }
  };

  if (!post) return <p>게시글을 불러오는 중...</p>;

  return (
    <div className="detail">
      <h1 className="dtitle">
        {post.isNotice && <span className="notice-tag">[공지]</span>}
        {post.title}
      </h1>
      <p className="dname">작성자: {post.userName}</p>
      <p className="dcontent">{post.content}</p>

      {(currentUser === post.userId || currentUser === "admin") && (
        <div className="detail-button-group">
          <button className="detail-button edit" onClick={handleEdit}>수정</button>
          <button className="detail-button delete" onClick={handleDelete}>삭제</button>
        </div>
      )}

      <button className="detail-btn" onClick={() => navigate(-1)}>이전</button>

      <ReplyList />
    </div>
  );
};

export default Detail;
