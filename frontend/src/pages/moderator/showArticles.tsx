import swal from "sweetalert";
import React, { useState, useEffect } from 'react';

interface Item {
    title: string,
    authors: string[],
    source: string,
    year: number,
    doi: string,
    summary: string,
}

const ModeratorArticles = () => {
 
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/article/submit');
        if(!response.ok) {
            swal("Network response was not ok");
        } else {
          const data = await response.json();
          const articles = data.articles || [data.article];
          setArticles(articles);
          if (articles.length === 0 || articles[0] === null) {
            swal("No articles found");
          }
        }
    } catch(error) {
        swal("Error, cannot reach API");
    }
    };

    <div>
      {articles.map((result: any) => {
        if(!result) {
          return null;
        }

        return (
          <div key={result._id}>
              <h1 className="font-bold">{result.title}</h1>
              <h2>Authors: {result.authors.join(", ")}</h2>
              <p>Source: {result.source}</p>
              <p>Publication Year: {result.year}</p>
              <p>DOI: {result.doi}</p>
              <p>Summary: {result.summary}</p>
          </div>
          
        );
      })}
    </div>
};

export default ModeratorArticles;
