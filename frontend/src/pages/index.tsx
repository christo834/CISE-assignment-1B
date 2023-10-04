import React from "react";
import ArticleDetails from "@/components/Search";
import "../styles/index.scss";
import Footer from "@/components/nav/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-white text-center text-3xl font-bold my-8">
        Welcome to Speed
      </h1>
      <ArticleDetails />
      <Footer />
    </div>
  );
}