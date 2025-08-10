import { Link } from "react-router";
import blogService from "../services/blogservice";

function Article({ post }) {
  const {
    id,
    title,
    text,
    tags,
    comments,
    author_id,
    created_at,
    author_username,
  } = post;
  return (
    <div className="card position-relative" style={{ width: "20rem" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title"> {title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {new Date(created_at).toLocaleDateString()}/
          </h6>

          <h6 className="card-subtitle mb-2 text-body-secondary-bold">
            {author_username}
          </h6>
        </div>
        {tags.length > 0 && (
          <p className="card-subtitle mb-2 text-body-secondary">
            {tags.join(", ")}
          </p>
        )}
        <p className="card-text">{text}</p>

        <Link to={`/posts/${post.id}/`} className="card-link">
          comment
        </Link>
      </div>
    </div>
  );
}

export default Article;
