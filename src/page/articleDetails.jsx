import { useEffect, useState } from "react";
import blogService from "../services/blogservice";
import { useParams, Link } from "react-router";
import { useAuth } from "../context/authContext";

function ArticleDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await blogService.getPostbyid(id);
        console.log(response);

        setPost(response);
      } catch (err) {
        console.log(err);
      }
    };
    loadPost();
  }, [id]);
  if (!post) return <div>...</div>;
  const { title, text, tags, comments, author, created_at } = post;
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await blogService.addComment(id, {
        text: commentText,
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await blogService.deleteComment(commentId);
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((c) => c.id !== commentId),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };
  const handleSaveEdit = async () => {
    try {
      const editComment = await blogService.apdateComment(editingCommentId, {
        text: editText,
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((c) =>
          c.id === editingCommentId ? editComment : c
        ),
      }));
      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mt-5">
      <div>
        <h1 className="card-title">{title}</h1>
        <p className="text-muted">
          {author} {new Date(created_at).toLocaleDateString()}
        </p>

        <p className="card-text" style={{ whiteSpace: "pre-line" }}>
          {text}
        </p>
        <p> {tags.join(", ")}</p>
      </div>

      <div className="mt-5">
        <h4>comments</h4>

        <form className="mb-4" onSubmit={handleAddComment}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="add comment..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            send
          </button>
        </form>
        {post.comments?.map((comment) => {
          console.log("Full comment:", comment);
          console.log("comment.author:", comment.author_username);
          return (
            <div key={comment.id} className="card mb-3">
              <div className="card-body">
                {editingCommentId === comment.id ? (
                  <>
                    <textarea
                      className="form-control mb-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSaveEdit}
                    >
                      💾 save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingCommentId(null)}
                    >
                      ❌ cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <h6 className="card-subtitle mb-2 text-muted">
                        from {comment.author_username} {""}{" "}
                        {new Date(comment.created_at).toLocaleDateString()}
                      </h6>
                      {user.userprofile_id === comment.author_id && (
                        <div>
                          <button
                            className="btn btn-sm btn-outline-secondary me-1"
                            onClick={() => handleEdit(comment)}
                          >
                            ✏️ edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(comment.id)}
                          >
                            🗑️ delete
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="card-text mt-2">{comment.text}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleDetails;
