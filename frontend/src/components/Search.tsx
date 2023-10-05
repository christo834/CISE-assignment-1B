import { useState } from "react";
import swal from "sweetalert";

const ArticleDetails = () => {
  const [searchType, setSearchType] = useState("title");
  const [title, setTitle] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state variable

  const fetchResults = async () => {
    setLoading(true);

    try {
      let response;
      if (searchType === "title") {
        response = await fetch(`https://cise-backend-murex.vercel.app/article/title/${title}`);
      } else {
        response = await fetch(
          `https://cise-backend-murex.vercel.app/article/year/${startYear}/${endYear}`
        );
      }
      if (response.ok) {
        const data = await response.json();
        const articles = data.articles || [data.article];
        setResults(articles);

        // If no results, display swal
        if (
          data.msg === "No article found with the provided title" ||
          articles.length === 0 ||
          articles[0] === null
        ) {
          swal("No results", "No results found for your search", "info");
        }
      } else {
        swal("Failed", "Failed to fetch results", "error");
      }
    } catch (error) {
      swal("Error", "Please try again", "error");
    }

    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If searchType is 'year' and startYear is greater than endYear, display an error and return
    if (searchType === "year" && parseInt(startYear) > parseInt(endYear)) {
      swal(
        "Invalid year range",
        "Start year cannot be greater than end year",
        "error"
      );
      return;
    }

    fetchResults();
  };

  return (
    <div className="text-white mt-20 text-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs lg:max-w-1/2 mx-auto"
      >
        <div className="mx-auto text-black">
          <select
            className="my-4"
            placeholder="Select type of search"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Search by Title</option>
            <option value="year">Search by Year Range</option>
          </select>
          {searchType === "title" ? (
            <input
              className="text-center italic shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
            />
          ) : (
            <>
              <input
                className="text-center italic shadow appearance-none border rounded w-full py-2 my-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="Enter start year"
              />
              <input
                className="text-center italic shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="Enter end year"
              />
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded animate-bounce"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : searchPerformed && results.length === 0 ? ( // Check if a search has been performed before displaying "No results found"
        <div className="text-center text-red-500">No results found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result: any) => {
            if (!result) {
              return null;
            }

            return (
              <div key={result._id} className="border p-4 rounded">
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
      )}
    </div>
  );
};

export default ArticleDetails;
