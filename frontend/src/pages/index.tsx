import ArticleDetails from "@/components/Search";
import "../styles/index.scss";

export default function Home() {
  return (
    <div>
      <ArticleDetails />
      <div className="container">
        <div className="container-within">
          <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
          <p>
            Welcome to Speed, the number one place to analyse the validity of
            your scholarly articles.
          </p>
          <p>Create an account to submit your articles.</p>
          <button className="SignUp-btn">Sign Up</button>
        </div>
        <div className="AUT-section">
          <div className="container-within">
            <h1>AUT Student?</h1>
            <p>
              If you're an AUT student looking for articlies to use in your
              study, look no further then
              <a
                href="https://library.aut.ac.nz/"
                className="AUT-link"
                target="_blank"
                rel="noopner noreferrer"
              >
                AUT Library.
              </a>
            </p>
          </div>
          <div className="apa-ref-container">
            <div className="home-guideline-design">
              <h1>REFERENCING AND APA</h1>
            </div>
            <h2 className="refer-link">Referencing guides</h2>
            <a
              href="https://aut.ac.nz.libguides.com/APA7th"
              target="_blank"
              className="refer-link"
            >
              &gt; APA 7th referencing guide
            </a>
            <a
              href="https://aut.ac.nz.libguides.com/turabian"
              target="_blank"
              className="refer-link"
            >
              &gt; Chicago referencing guide
            </a>
            <a
              href="https://aut.ac.nz.libguides.com/Harvard"
              target="_blank"
              className="refer-link"
            >
              &gt; Harvard referencing guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
