import ArticleCardList from "~/components/lists/article-card-list";
import HomeBanner from "~/components/banner/home-banner";

export default function Home() {
    return (
        <>
            <title>Refined | 精锻地</title>
            <div
                className="flex min-h-[calc(100vh-115px)] flex-col items-center justify-center bg-gradient-to-b from-[#efefef] to-[#efefef] overflow-hidden">
                <HomeBanner/>
                <div className="flex flex-col w-[70%]">
                    <ArticleCardList/>
                </div>

            </div>
        </>
    );
}
