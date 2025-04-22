import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")  // 서버 경로
      .then((response) => setPosts(response.data))  // DTO 데이터
      .catch((error) => {
        console.error("게시글 불러오기 실패:", error);
        alert("게시글을 불러오는 데 실패했습니다.");
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div>
      <h1>커뮤니티 게시판</h1>
      <Link to="/write">
        <button>글 작성</button>
      </Link>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* 게시글이 있을 때만 List 컴포넌트 렌더링 */}
      {filteredPosts.length > 0 ? (
        <List posts={currentPosts} />
      ) : (
        <p>게시글이 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {filteredPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Community;
