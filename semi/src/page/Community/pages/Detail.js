import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReplyList from "../components/ReplyList"; // 댓글 추가
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
      });
  }, [id]);

  const currentUser = localStorage.getItem("userId");

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`http://localhost:8080/posts/${id}`)
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
      <h1 className="dtitle">{post.title}</h1>
      <p className="dname">작성자: {post.userName}</p>
      <p className="dcontent">{post.content}</p>
      <button className="detail-btn" onClick={() => navigate(-1)}>이전</button>

      {currentUser === post.userId && (
        <div className="detail-button-group">
          <button className="detail-button edit" onClick={handleEdit}>수정</button>
          <button className="detail-button delete" onClick={handleDelete}>삭제</button>
        </div>
      )}

      {/* ✅ 댓글 리스트 컴포넌트 렌더링 */}
      <ReplyList />
    </div>
  );
};

export default Detail;
