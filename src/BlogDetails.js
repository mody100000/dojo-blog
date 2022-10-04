import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    data: blog,
    error,
    loading,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, { method: "DELETE" }).then(
      () => {
        history.push("/");
      }
    );
  };

  return (
    <div className="blog-details">
      {loading && <div>is loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title} </h2>
          <p>written by {blog.auther}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}> Delete Blog </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
