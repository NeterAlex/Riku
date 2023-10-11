import ArticleCardList from "~/components/lists/article-card-list";
import HomeBanner from "~/components/banner/home-banner";

export default function Home() {
  return (
    <>
      <title>Refined | 精锻地</title>
      <div className="flex min-h-[calc(100vh-115px)] flex-col items-center justify-center overflow-hidden bg-[#efefef] dark:bg-[#202022]">
        <HomeBanner />
        <div className="flex w-[70%] flex-col">
          <ArticleCardList />
        </div>
      </div>
    </>
  );
}
