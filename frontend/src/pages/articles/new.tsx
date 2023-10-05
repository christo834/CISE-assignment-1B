import { FormEvent, useState, useEffect } from "react";
import formStyles from "../../styles/Form.module.scss";
import swal from "sweetalert";

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    event.preventDefault();
    // Your fetch logic here
    try {
      const response = await fetch("https://cise-backend-murex.vercel.app/article/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          authors,
          source,
          year: pubYear,
          doi,
          summary,
          //linked_discussion: linkedDiscussion,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        await setResponseMessage(responseData.message);
        await swal("Submitted", "Article submitted successfully", "success");
        console.log("Article submitted successfully");
        // You can also reset form fields or perform other actions here
      } else {
        const errorData = await response.json();
        await setResponseMessage(errorData.message);
        await swal("Failed", "Article submission unsuccessful", "error");
        console.error("Failed to submit article");
        // Handle the error here
      }
    } catch (error) {
      console.error("Error occurred:", error);
      await swal("Error", "Please try again", "error");
      await setResponseMessage(
        "An error occurred while submitting the article."
      );
      // Handle network or other errors here
    }

    console.log(
      JSON.stringify({
        title,
        authors,
        source,
        publication_year: pubYear,
        doi,
        summary,
        linked_discussion: linkedDiscussion,
      })
    );
  };
  // Some helper methods for the authors array
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };
  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };
  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };
  // Return the full form
  return (
    <div className={formStyles.container}>
      <div className={formStyles.headerTitle}>
        <h1 className={formStyles.articleFont}>New Article</h1>
      </div>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title" className={formStyles.labelTitle}>
          Title:
        </label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="author" className={formStyles.labelTitle}>
          Authors:
        </label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>
        <label htmlFor="source" className={formStyles.labelTitle}>
          Source:
        </label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />
        <label htmlFor="pubYear" className={formStyles.labelTitle}>
          Publication Year:
        </label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />
        <label htmlFor="doi" className={formStyles.labelTitle}>
          DOI:
        </label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />
        <label htmlFor="summary" className={formStyles.labelTitle}>
          Summary:
        </label>
        <textarea
          className={formStyles.formTextArea}
          name="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <button className={formStyles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default NewDiscussion;
