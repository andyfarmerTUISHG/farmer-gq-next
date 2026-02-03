import LastFilmWatched from "@/app/(site)/components/last-film-watched";
import ProfileComponent from "@/app/(site)/components/profile-component";

import ArticleShowcase from "./components/article-showcase";

export default function Home() {
  return (
    <>
      <ProfileComponent />
      <div className="container mx-auto px-4 py-8">
        <LastFilmWatched />
      </div>
      <ArticleShowcase />
    </>
  );
}
