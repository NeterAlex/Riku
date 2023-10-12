import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { MdPreview, type Themes } from "md-editor-rt";
import { api } from "~/utils/api";
import "md-editor-rt/lib/preview.css";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import ArticleEditButton from "~/components/buttons/article-edit-button";

export default function ArticlePage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { theme } = useTheme();
  const articleId = router.query.id;
  const { data: certainArticle, status } = api.article.getById.useQuery({
    id: Number(articleId),
  });
  const [id] = useState<string>("article-preview");
  const tagString = certainArticle?.tags.map((t) => `#${t.name}`).join(" ");
  const dateString = certainArticle?.publishedAt.toLocaleDateString("zh-CN");
  console.log(sessionData?.user);

  if (status === "loading" || status === "error") {
    return (
      <>
        <div className=" flex min-h-[calc(85vh-115px)] w-full flex-col items-center justify-center bg-[#efefef] dark:bg-[#202022]">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <title>{certainArticle?.title} | Refined</title>
      <div className="">
        <div
          className="h-[15vh] min-h-[10vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${certainArticle?.image})` }}
        ></div>
        <div
          className={`z-10 flex min-h-[calc(85vh-115px)] w-full flex-col bg-[#efefef] bg-cover bg-center dark:bg-[#202022]`}
        >
          <Card className="my-5 h-full w-[50%] max-w-[60vw] self-center bg-[#efefef] dark:bg-[#262628]">
            <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10">
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <p className="pl-1 text-medium text-gray-600 dark:text-gray-400">
                    By
                  </p>
                  <p className="text-medium text-secondary dark:text-primary">
                    {certainArticle?.author.name}
                  </p>
                  <p className="text-medium text-gray-600 dark:text-gray-400">
                    in
                  </p>
                  <p className="text-medium text-secondary dark:text-primary">
                    {tagString}
                  </p>
                  <p className="text-medium text-gray-600 dark:text-gray-400">
                    {dateString}
                  </p>
                </div>
                <div>
                  {sessionData?.user.role === "ADMIN" ? (
                    <ArticleEditButton articleId={articleId as string} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <h1 className="header-font text-2xl dark:text-gray-300">
                {certainArticle?.title}
              </h1>
              <p className="content-font text-medium text-gray-500 dark:text-gray-400">
                {certainArticle?.desc}
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div>
                <MdPreview
                  className="content-font"
                  editorId={id}
                  theme={theme as Themes}
                  modelValue={certainArticle?.content ?? "Loading"}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
