import { useEffect, useState } from "react";
import "../../styles/table.css";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  doi: string;
  claim: string;
  evidence_level: string;
  summary: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  //searches for true articles
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("http://localhost:8000/article/analysed");
      const data = await response.json();

      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-white">
      {articles.map((article) => (
        <div
          className="rounded overflow-hidden shadow-lg p-4 text-white border-white border-2 text-wrap"
          key={article._id}
        >
          <h3 className="font-bold text-xl mb-2">{article.title}</h3>
          <p>
            <b className="text-yellow-500">Authors: </b>{" "}
            {article.authors.join(", ")}
          </p>
          <p>
            <b className="text-yellow-500">Source: </b>
            {article.source}
          </p>
          <p>
            <b className="text-yellow-500">Year: </b> {article.year}
          </p>
          <p>
            <b className="text-yellow-500">DOI: </b> {article.doi}
          </p>
          <p>
            <b className="text-yellow-500">Claim: </b> {article.claim}
          </p>
          <p>
            <b className="text-yellow-500">Evidence Level: </b>{" "}
            {article.evidence_level}
          </p>
          <p>
            <b className="text-yellow-500">Summary: </b> {article.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Articles;
