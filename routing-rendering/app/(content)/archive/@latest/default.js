import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

const LatestNewsPage = () => {
  const latestNews = getLatestNews();
  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
};

export default LatestNewsPage;
