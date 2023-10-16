import ArticleCardList from "~/components/lists/article-card-list";
import HomeBanner from "~/components/banner/home-banner";
import MotionFrame from "~/components/frame/motion-frame";
import MoreArticleButton from "~/components/buttons/more-article-button";

export default function Home() {
  return (
    <>
      <title>Refined | 精锻地</title>
      <MotionFrame>
        <div className="flex min-h-[calc(100vh-115px)] w-full flex-col items-center justify-center overflow-hidden bg-[#efefef] dark:bg-[#202022]">
          <HomeBanner />
          <div className="flex w-[95%] flex-col justify-center sm:w-[85%] md:w-[70%]">
            <ArticleCardList />
            <MoreArticleButton />
          </div>
        </div>
      </MotionFrame>
    </>
  );
}
