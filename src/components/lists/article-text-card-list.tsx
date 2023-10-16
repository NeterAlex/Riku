import { api } from "~/utils/api";
import ArticleTextCard from "~/components/cards/article-text-card";
import { CircularProgress } from "@nextui-org/react";

export default function ArticleTextCardList() {
  const { data: articleList, status } =
    api.article.getAllWithPagination.useQuery({
      pageIndex: 1,
      pageSize: 50,
    });

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
      <div className="flex flex-wrap justify-center gap-5 px-6 py-5">
        {articleList?.slice(1).map((a) => {
          // 处理信息
          const tagString = a.tags.map((t) => `#${t.name}`).join(" ");
          const dateString = a.publishedAt.toLocaleDateString("zh-CN");

          return (
            <ArticleTextCard
              key={a.id}
              id={a.id}
              title={a.title}
              category={tagString}
              time={dateString}
              desc={a.desc}
              author={a.author.name ?? "GUEST"}
            />
          );
        })}
      </div>
    </>
  );
}
