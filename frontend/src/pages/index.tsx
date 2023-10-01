import "../styles/index.scss";

export default function Home() {
  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}
