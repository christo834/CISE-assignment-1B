import { useEffect, useState, FormEvent } from "react";
import "../../styles/table.css";
import swal from "sweetalert";
import { SpinnerInfinity } from "spinners-react";
import Modal from "react-modal";
import axios from "axios";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
  moderated: string;
}

interface AdminProps {
  articles: Article[];
}

export async function getStaticProps() {
  const response = await axios.get(
    "https://cise-backend-5103.vercel.app/article/all"
  );
  const articles = response.data.articles;

  return {
    props: { articles },
    revalidate: 1,
  };
}

const Admin: React.FC<AdminProps> = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call fetchArticles on initial render and whenever articles change
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://cise-backend-5103.vercel.app/article/all"
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles]);

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:8000/article/${editingArticle._id}`,
        editingArticle
      );

      swal("Success", "Article updated successfully", "success");
      setIsModalOpen(false);

      fetchArticles();
    } catch (error) {
      swal("Error", (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-white m-6 text-white">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinnerInfinity
            size={200}
            thickness={180}
            speed={180}
            color="rgba(71, 172, 57, 1)"
            secondaryColor="rgba(57, 172, 151, 0.44)"
          />
        </div>
      ) : (
        articles.map((article) => (
          <div
            className="rounded overflow-hidden shadow-lg p-4 text-white border-white border-2 text-wrap my-4 "
            key={article._id}
          >
            <h3 className="font-bold text-xl text-wrap mb-2">
              {article.title}
            </h3>
            <p>{article.authors.join(", ")}</p>
            <p>{article.source}</p>
            <p>{article.year}</p>
            <p className="italic">{article.doi}</p>
            <p>{article.summary}</p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleEdit(article)}
              >
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
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Edit Article
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700">
                Title:
                <input
                  type="text"
                  value={editingArticle.title || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <label className="block mt-3 text-gray-700">
                Authors:
                <input
                  type="text"
                  value={editingArticle.authors?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      authors: e.target.value.split(", "),
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <label className="block mt-3 text-gray-700">
                Source:
                <input
                  type="text"
                  value={editingArticle.source || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      source: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <label className="block mt-3 text-gray-700">
                Year:
                <input
                  type="number"
                  value={editingArticle.year || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      year: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <label className="block mt-3 text-gray-700">
                DOI:
                <input
                  type="text"
                  value={editingArticle.doi || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      doi: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <label className="block mt-3 text-gray-700">
                Summary:
                <textarea
                  value={editingArticle.summary || ""}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      summary: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm sm:text-sm border-gray-300 p-4"
                />
              </label>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
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

export default Admin;
