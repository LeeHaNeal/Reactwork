import React from "react";
import { Link } from "react-router-dom";

const List = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post-item" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default List;
