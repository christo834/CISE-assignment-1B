import ArticleDetails from "@/components/Search";
import "../styles/index.scss";

export default function Home() {
  return (
    <>
      <h1 className="text-white text-center text-2xl font-bold mt-8">
        Welcome to Speed
      </h1>
      <ArticleDetails />
    </>
  );
}
