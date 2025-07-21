import { Link } from "react-router";

function Article() {
  return (
    <div className="card position-relative" style={{ width: "20rem" }}>
      <button
        className="btn btn-link position-absolute bottom-0 end-0 m-3 p-0"
        style={{ zIndex: 1 }}
      >
        <i className="bi bi-heart-fill text-danger"></i>
      </button>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title">post title</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">date</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">author</h6>
        </div>
        <h6 className="card-subtitle mb-2 text-body-secondary">tag</h6>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>

        <Link className="card-link">comment</Link>
      </div>
    </div>
  );
}

export default Article;
