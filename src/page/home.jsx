import Article from "../component/article";

function Home() {
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
            /*value={inputSearch}*/
          ></input>
        </div>
      </div>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <Article></Article>
        <Article></Article>
        <Article></Article>
      </div>
    </div>
  );
}
export default Home;
