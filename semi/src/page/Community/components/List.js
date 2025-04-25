import React from "react";
import { Link } from "react-router-dom";
import './List.css';

const List = ({ posts }) => {
  return (
    <div className="list-container">
      {posts.map((post) => (
        <div key={post.id} className="list-item">
          {/* 제목 링크 */}
          <Link to={`/detail/${post.id}`} className="post-link">
            <h2>{post.title}</h2>
          </Link>

          {/* 본문 요약 */}
          <p>{post.content}</p>

          {/* 작성자와 날짜 추가 */}
          <div className="post-meta">
            <span className="author">작성자: {post.userName}</span>
            <span className="date">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
