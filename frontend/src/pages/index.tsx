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
        <div className="AUT-section"></div>
      </div>
    </div>
  );
}
