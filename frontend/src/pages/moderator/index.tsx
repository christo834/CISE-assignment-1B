import { useEffect, useState } from 'react';
import "../../styles/table.css"
import swal from 'sweetalert';

interface Moderator {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
  moderated: string; // Add this line
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
    const article = articles.find(article => article._id === id);
    if (article && article.moderated === 'true') {
      swal("Info", "This article has already been approved", "info");
      return;
    }

    const response = await fetch(`https://cise-backend-5103.vercel.app/article/${id}/true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, moderated: 'true' } : article
      );
      setArticles(updatedArticles);
      swal("Success", "Article approved successfully", "success");
    } else {
      swal("Error", "Failed to approve the article", "error");
    }
  };

  const handleSetModeratorFalse = async (id: string) => {
    const article = articles.find(article => article._id === id);
    if (article && article.moderated === 'false') {
      swal("Info", "This article has already been disapproved", "info");
      return;
    }

    const response = await fetch(`https://cise-backend-5103.vercel.app/article/${id}/false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, moderated: 'false' } : article
      );
      setArticles(updatedArticles);
      swal("Success", "Article disapproved successfully", "success");
    } else {
      swal("Error", "Failed to disapprove the article", "error");
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