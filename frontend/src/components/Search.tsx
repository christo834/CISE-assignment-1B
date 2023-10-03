import { useState, useEffect } from "react";
import swal from "sweetalert";

const ArticleDetails = () => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/article/title/${title}`
      );
      if (response.ok) {
        const article = await response.json();
        setArticle(article.article);
      } else {
        swal("Failed", "Failed to fetch article", "error");
      }
    } catch (error) {
      swal("Error", "Please try again", "error");
    }
    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchArticle();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : article ? (
        <div>
          <h1>{article.title}</h1>
          <h2>Authors: {article.authors.join(", ")}</h2>
          <p>Source: {article.source}</p>
          <p>Publication Year: {article.year}</p>
          <p>DOI: {article.doi}</p>
          <p>Summary: {article.summary}</p>
        </div>
      ) : (
        <div>No article found with the provided title</div>
      )}
    </div>
  );
};

export default ArticleDetails;
