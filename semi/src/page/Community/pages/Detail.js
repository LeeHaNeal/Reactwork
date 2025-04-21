import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = ({ match }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const { id } = match.params;
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("게시글 불러오기 실패:", error));
  }, [match.params]);

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
    </div>
  );
};

export default Detail;
