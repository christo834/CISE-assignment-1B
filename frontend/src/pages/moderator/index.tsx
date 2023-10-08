import { useEffect, useState } from 'react';
import "../../styles/table.css"

interface Moderator {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
}

const Moderator = () => {
  const [articles, setArticles] = useState<Moderator[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('https://cise-backend-5103.vercel.app/article/all');
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  const handleSetModeratorTrue = async (id: string) => {
    const response = await fetch(`https://cise-backend-5103.vercel.app/article/${id}/moderator`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moderator: true }),
    });

    if (response.ok) {
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, moderator: true } : article
      );
      setArticles(updatedArticles);
    }
  };

  const handleSetModeratorFalse = async (id: string) => {
    const response = await fetch(`https://cise-backend-5103.vercel.app/article/${id}/moderator`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moderator: false }),
    });

    if (response.ok) {
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, moderator: false } : article
      );
      setArticles(updatedArticles);
    }
  };

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

          <div className="flex justify-between">
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleSetModeratorTrue(article._id)}>
              Approve
            </button>
            <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"  onClick={() => handleSetModeratorFalse(article._id)}>
              Disapprove 
            </button>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Moderator;
