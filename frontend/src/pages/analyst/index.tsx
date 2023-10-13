import { useEffect, useState, FormEvent } from 'react';
import "../../styles/table.css"
import swal from 'sweetalert';
import { SpinnerInfinity } from 'spinners-react';
import Modal from 'react-modal';
import withAuth from '@/hoc/withAuth';
import useAuth from '@/hooks/useAuth';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
  moderated: string;
  claim: string;
  analysed: string;
  evidence_level: string;
}


const Analyst = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = useAuth();

  const fetchArticles = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://cise-backend-5103.vercel.app/article/moderated');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);
  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleSetAnalysedTrue = async (id: string) => {
    const article = articles.find(article => article._id === id);
    if (article && article.analysed === 'true') {
      swal("Info", "This article has already been approved", "info");
      return;
    }

    //CHANGE TO VERCEL LINK
    //https://cise-backend-5103.vercel.app/article/analysed/${editingArticle._id}/true
    const response = await fetch(`http://localhost:8000/article/analysed/${id}/true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedArticles = articles.map(article =>
        article._id === id ? { ...article, analysed: 'true' } : article
      );
      setArticles(updatedArticles);
      swal("Success", "Article analysed successfully", "success");
    } else {
      swal("Error", "Failed to analyse the article", "error");
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //CHANGE TO VERCEL LINK ABOVE
      //https://cise-backend-5103.vercel.app/article/${editingArticle._id}
      const response = await fetch(`http://localhost:8000/article/${editingArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingArticle),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update article');
      }
  
      const updatedArticle = await response.json();
      console.log(updatedArticle);
      swal("Success", "Article updated successfully", "success");
      setIsModalOpen(false);
  
      // Refetch the articles
      fetchArticles();
      setLoading(false); 
    } catch (error) {
      swal("Error", (error as Error).message, "error");
    }
    handleSetAnalysedTrue(editingArticle._id as string);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-white m-6">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinnerInfinity size={200} thickness={180} speed={180} color="rgba(71, 172, 57, 1)" secondaryColor="rgba(57, 172, 151, 0.44)" />
        </div>  
      ) : (
        articles.map((article) => (
          <div className="rounded overflow-hidden shadow-lg p-4 text-white border-white border-2 text-wrap my-4 " key={article._id}>
            <h3 className="font-bold text-xl text-wrap mb-2">{article.title}</h3>
            <p>Authors: {article.authors.join(', ')}</p>
            <p>Source: {article.source}</p>
            <p>Year: {article.year}</p>
            <p className='italic'>{article.doi}</p>
            <p>Claim: {article.claim}</p>
    <p>Evidence Level: {article.evidence_level}</p>
            <p>Summary: {article.summary}</p>

            <div className="flex justify-between mt-4">
              <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(article)}>
                Edit
              </button>
            </div>
          </div>
        ))
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center outline-none mt-20"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        contentLabel="Edit Article Modal"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-3/4 lg:w-1/2">
          <div className="bg-gray-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">Edit Article</h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700">
                Claim:
                <input type="text" value={editingArticle.claim || ''} onChange={e => setEditingArticle({ ...editingArticle, claim: e.target.value })} className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4" />
              </label>
              <label className="block mt-3 text-gray-700">
                Evidence Level:
                <input type="text" value={editingArticle.evidence_level || ''} onChange={e => setEditingArticle({ ...editingArticle, evidence_level: e.target.value })} className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4" />
              </label>
              <div className="mt-5 sm:mt-6">
                <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withAuth(Analyst);
