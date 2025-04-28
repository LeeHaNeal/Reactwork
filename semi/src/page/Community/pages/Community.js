import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./community.css";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // ✅ posts 불러오는 함수 분리
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts");
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="community-container">
      <div className="community-left">
        <div className="search-bar-wrapper">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <Link to="/write">
            <button className="write-button">글 작성</button>
          </Link>
          <Link to="/MyPost">
            <button className="write-button">내 글</button>
          </Link>
        </div>

        {filteredPosts.length > 0 ? (
          <List posts={currentPosts} fetchPosts={fetchPosts} />
        ) : (
          <p>게시글이 없습니다.</p>
        )}
        
        {filteredPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <div className="rank-box">
        <div className="crown">👑</div>
        <ol>
          <li>1. 0000</li>
          <li>2. 0000</li>
          <li>3. 0000</li>
        </ol>
      </div>
    </div>
  );
};

export default Community;
