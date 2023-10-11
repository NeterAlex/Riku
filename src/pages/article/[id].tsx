import { useRouter } from "next/router";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { MdPreview } from "md-editor-rt";
import { api } from "~/utils/api";
import "md-editor-rt/lib/preview.css";
import { useState } from "react";

export default function ArticlePate() {
  const router = useRouter();
  const articleId = router.query.id;
  const { data: certainArticle } = api.article.getById.useQuery({
    id: Number(articleId),
  });
  const [id] = useState<string>("article-preview");
  const tagString = certainArticle?.tags.map((t) => `#${t.name}`).join(" ");
  const dateString = certainArticle?.publishedAt.toLocaleDateString("zh-CN");
  return (
    <>
      <title>{certainArticle?.title} | Refined</title>
      <div className="">
        <div
          className="h-[15vh] min-h-[10vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${certainArticle?.image})` }}
        ></div>
        <div
          className={`z-10 flex min-h-[calc(85vh-115px)] w-full flex-col bg-gradient-to-b
                 from-[#efefef] to-[#efefef] bg-cover bg-center`}
        >
          <Card className="my-5 h-full w-[50%] max-w-[60vw] self-center ">
            <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10">
              <div className="flex gap-2">
                <p className="pl-1 text-medium text-gray-600">By</p>
                <p className="text-medium text-secondary">
                  {certainArticle?.author.name}
                </p>
                <p className="text-medium text-gray-600">in</p>
                <p className="text-medium text-secondary">{tagString}</p>
                <p className="text-medium text-gray-600">{dateString}</p>
              </div>
              <h1 className="header-font text-2xl">{certainArticle?.title}</h1>
              <p className="content-font text-medium text-gray-500">
                {certainArticle?.desc}
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div>
                <MdPreview
                  className="content-font"
                  editorId={id}
                  modelValue={certainArticle?.content ?? "Loading"}
                  previewTheme={"vuepress"}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
