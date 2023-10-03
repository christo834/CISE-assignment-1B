import "./index.scss";
import ModeratorArticles from "./showArticles";
export default function Home() {
  return (
    <>
      <div className="header-container">
      <h1>This is the MODERATOR Page</h1>
      </div>
      <ModeratorArticles />
      </>
  );
}