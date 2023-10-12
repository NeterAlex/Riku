import { api } from "~/utils/api";
import ArticleCard from "~/components/cards/article-card";
import { CircularProgress } from "@nextui-org/react";

export default function ArticleCardList() {
  const { data: articleList, status } =
    api.article.getAllWithPagination.useQuery({ pageIndex: 1, pageSize: 50 });

  if (status === "loading" || status === "error") {
    return (
      <>
        <div className="flex flex-wrap content-center justify-center gap-5 py-5">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 py-5">
        {articleList?.slice(1).map((a) => {
          // 处理信息
          const tagString = a.tags.map((t) => `#${t.name}`).join(" ");
          const dateString = a.publishedAt.toLocaleDateString("zh-CN");

          return (
            <ArticleCard
              key={a.id}
              id={a.id}
              title={a.title}
              category={tagString}
              time={dateString}
              desc={a.desc}
              author={a.author.name ?? "GUEST"}
              img={a.image}
            />
          );
        })}
      </div>
    </>
  );
}
