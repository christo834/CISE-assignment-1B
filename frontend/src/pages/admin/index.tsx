import { useEffect, useState } from 'react';
import "../../styles/table.css"
import Popup from '../../components/pop-up/Popup';

interface Edit_Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
}

const Admin: React.FC  = () => {
  const [articles, setArticles] = useState<Edit_Article[]>([]);
  const [isPopupOpen, setPopUpOpen] = useState(false);

  const openPopup = ()=>{
    setPopUpOpen(true);
  };

  const closePopup = () =>{
    setPopUpOpen(false);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('https://cise-backend-5103.vercel.app/article/all');
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-4 gap-4 border-white">
      {articles.map((article) => (
        <div className="rounded overflow-hidden mshadow-lg p-4 text-white border-white border-2 text-wrap" key={article._id}>
          <h3 className="font-bold text-xl mb-2">{article.title}</h3>
          <p>{article.authors.join(', ')}</p>
          <p>{article.source}</p>
          <p>{article.year}</p>
          <p>{article.doi}</p>
          <p>{article.summary}</p>
          <button className="font-bold border-1 my-1 rounded-lg items-center justify-center w-10 bg-blue-500" onClick={openPopup}>Edit</button>
          <Popup isOpen={isPopupOpen} onClose = {closePopup} />
        </div>
      ))}
    </div>
  );
};

export default Admin;
