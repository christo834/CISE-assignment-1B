import { useEffect, useState } from 'react';
import "../../styles/table.css"

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('https://cise-backend-5103.vercel.app/article/all');
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-white">
      {articles.map((article) => (
        <div className="rounded overflow-hidden shadow-lg p-4 text-white border-white border-2 text-wrap" key={article._id}>
          <h3 className="font-bold text-xl mb-2">{article.title}</h3>
          <p>{article.authors.join(', ')}</p>
          <p>{article.source}</p>
          <p>{article.year}</p>
          <p>{article.doi}</p>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default Articles;
