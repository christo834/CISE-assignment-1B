import { useEffect, useState } from "react";
import "../../styles/table.css";
import swal from "sweetalert";
import { SpinnerInfinity } from "spinners-react";

interface Moderator {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  summary: string;
  moderated: string;
  claim: string;
  evidence_level: string;
  analysed: string;
}

const Moderator = () => {
  const [articles, setArticles] = useState<Moderator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://cise-backend-5103.vercel.app/article/unmoderated"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSetModeratorTrue = async (id: string) => {
    const article = articles.find((article) => article._id === id);
    if (article && article.moderated === "true") {
      swal("Info", "This article has already been approved", "info");
      return;
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);

    const response = await fetch(
      `https://cise-backend-5103.vercel.app/article/${id}/true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedArticles = articles.map((article) =>
        article._id === id ? { ...article, moderated: "true" } : article
      );
      setArticles(updatedArticles);
      swal("Success", "Article approved successfully", "success");
    } else {
      swal("Error", "Failed to approve the article", "error");
    }
  };

  const handleSetModeratorFalse = async (id: string) => {
    const article = articles.find((article) => article._id === id);
    if (article && article.moderated === "false") {
      swal("Info", "This article has already been disapproved", "info");
      return;
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);

    const response = await fetch(
      `https://cise-backend-5103.vercel.app/article/${id}/false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedArticles = articles.map((article) =>
        article._id === id ? { ...article, moderated: "false" } : article
      );
      setArticles(updatedArticles);
      swal("Success", "Article disapproved successfully", "success");
    } else {
      swal("Error", "Failed to disapprove the article", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-white">
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
      ) : articles && articles.length > 0 ? (
        articles.map((article) => (
          <div
            className="rounded overflow-hidden shadow-lg p-4 text-white border-white border-2 text-wrap my-4 "
            key={article._id}
          >
            <h3 className="font-bold text-xl mb-2 text-wrap mb-6">
              {article.title}
            </h3>
            <p>
              <div className="text-yellow-500">Author:</div>{" "}
              {article.authors.join(", ")}
            </p>
            <p>
              <div className="text-yellow-500">Source:</div> {article.source}
            </p>
            <p>
              <div className="text-yellow-500">Year:</div> {article.year}
            </p>
            <p className="italic">
              <div className="text-yellow-500">DOI:</div>
              {article.doi}
            </p>
            <p>
              <div className="text-yellow-500">Summary:</div> {article.summary}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleSetModeratorTrue(article._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleSetModeratorFalse(article._id)}
              >
                Disapprove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white ">No articles to be moderated</div>
      )}
    </div>
  );
};

export default Moderator;
