import { useEffect, useState } from "react";
import Article from "../component/article";
import blogService from "../services/blogservice";
import { useSearch } from "../context/searchContext";
function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { inputSearch, setInputSearch } = useSearch();
  const postsPerPage = 3;
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await blogService.getAllposts();
        console.log(response);
        setPosts(response);
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, []);
  useEffect(() => {
    setCurrentPage(0);
  }, [inputSearch]);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(inputSearch.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="input-group w-25 m-5">
          <span className="input-group-text border border-secondary p-2 border-opacity-50">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control form-control-sm  border border-secondary p-2 border-opacity-50"
            placeholder=""
            aria-label="search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {currentPosts.map((post) => (
          <Article key={post.id} post={post} />
        ))}
      </div>
      <div className="d-flex justify-content-center my-4 gap-3">
        <button
          className="btn btn-outline-primary"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  );
}
export default Home;
