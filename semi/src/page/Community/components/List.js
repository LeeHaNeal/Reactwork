import React from "react";
import { Link } from "react-router-dom";
import './List.css';

const List = ({ posts }) => {
  return (
    <div className="list-container">
      {posts.map((post) => (
        <div key={post.id} className="list-item">
          <Link to={`/detail/${post.id}`} className="post-link">
            {/* 공지 여부 체크 */}
            <h2>
            {post.isNotice && <span className="notice-tag">[공지]</span>}
              {post.title}
            </h2>
          </Link>
          <p>{post.content}</p>
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
