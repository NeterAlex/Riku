import { api } from "~/utils/api";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Chip } from "@nextui-org/chip";
import { useTheme } from "next-themes";
import MotionFrame from "~/components/frame/motion-frame";
import PageBanner from "~/components/banner/page-banner";

export default function ArchivePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data } = api.article.getListGroupByPublishedTime.useQuery();
  const { data: tagData } = api.article.getAllTags.useQuery();
  const headerImage =
    "https://images.pexels.com/photos/33130/typewriter-keys-mechanically-letters.jpg?auto=compress&cs=tinysrgb&w=800";
  // 按月分组
  const groupedArticles: Record<string, typeof data> = {};
  data?.forEach((article) => {
    const publishedDate = new Date(article.publishedAt);
    const month = `${publishedDate.getFullYear()}/${
      publishedDate.getMonth() + 1
    }`;
    if (!groupedArticles[month]) {
      groupedArticles[month] = [];
    }
    groupedArticles[month]?.push(article);
  });
  const articleList: {
    month: string;
    articles: typeof data;
  }[] = Object.entries(groupedArticles).map(([month, articles]) => {
    return {
      month,
      articles,
    };
  });

  return (
    <>
      <title>归档 | Refined</title>
      <MotionFrame>
        <>
          <PageBanner image={headerImage} />
          <div>
            <div
              className={`背景颜色 z-10 flex min-h-[calc(85vh-115px)] w-full flex-col
bg-[#efefef] bg-cover bg-center dark:bg-[#202022]`}
            >
              <Card className="my-5 h-full w-full  self-center bg-[#efefef] dark:bg-[#262628] dark:text-gray-400 sm:w-[80%] md:w-[65%] lg:w-[50%] ">
                <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10 ">
                  <h1 className="header-font text-2xl dark:text-gray-400 ">
                    归档 | Archive
                  </h1>
                  <p className="content-font text-medium text-gray-500 dark:text-gray-400">{`${articleList[
                    articleList?.length - 1
                  ]?.month} - ${articleList[0]?.month}`}</p>
                </CardHeader>
                <Divider />
                <CardBody className="px-8 dark:text-gray-400">
                  <div className="flex flex-wrap gap-2 px-2 pb-2 dark:text-gray-300">
                    {tagData?.map((tag, index) => {
                      return (
                        <Chip
                          variant="flat"
                          color={theme === "light" ? "secondary" : "primary"}
                          key={index}
                          endContent={
                            <Chip
                              color={
                                theme === "light" ? "secondary" : "primary"
                              }
                              variant="light"
                            >
                              {tag._count.articles}
                            </Chip>
                          }
                        >
                          {tag.name}
                        </Chip>
                      );
                    })}
                  </div>
                  <Accordion
                    className="dark:text-gray-400"
                    defaultSelectedKeys="all"
                    selectionMode={"multiple"}
                    selectionBehavior={"toggle"}
                    showDivider={false}
                    motionProps={{
                      variants: {
                        enter: {
                          y: 0,
                          opacity: 1,
                          height: "auto",
                          transition: {
                            height: {
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                              duration: 1,
                            },
                            opacity: {
                              easings: "ease",
                              duration: 1,
                            },
                          },
                        },
                        exit: {
                          y: -10,
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: {
                              easings: "ease",
                              duration: 0.25,
                            },
                            opacity: {
                              easings: "ease",
                              duration: 0.3,
                            },
                          },
                        },
                      },
                    }}
                  >
                    {articleList.map(({ month, articles }, index) => {
                      const [_year, _month] = month.split("/");
                      return (
                        <AccordionItem
                          key={index}
                          aria-label={month}
                          title={`${_year}年${_month}月`}
                          className="header-font dark:text-gray-400"
                        >
                          {articles?.map((article, _index) => {
                            const tagString = article?.tags
                              .map((t) => `#${t.name}`)
                              .join(" ");
                            const dateString =
                              article?.publishedAt.toLocaleDateString("zh-CN");
                            return (
                              <div
                                key={_index}
                                className="mt-1 flex cursor-pointer justify-between hover:text-secondary dark:hover:text-primary"
                                onClick={() =>
                                  void router.push(`/article/${article.id}`)
                                }
                              >
                                <div className="flex justify-start gap-2">
                                  <p className="header-font text-medium text-gray-500">
                                    {dateString.split("/")[2]}日
                                  </p>
                                  <h1 className="header-font text-medium text-secondary dark:text-primary">
                                    {article.title}
                                  </h1>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <p className="content-font text-medium text-gray-600 dark:text-gray-500">
                                    {tagString}
                                  </p>
                                  <p className="content-font text-medium text-secondary dark:text-primary">
                                    {article.author.name}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      </MotionFrame>
    </>
  );
}
