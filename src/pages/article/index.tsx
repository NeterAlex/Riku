import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import PageBanner from "~/components/banner/page-banner";
import MotionFrame from "~/components/frame/motion-frame";
import ArticleTextCardList from "~/components/lists/article-text-card-list";

export default function ArticleIndexPage() {
  const imageUrl =
    "https://images.pexels.com/photos/18513459/pexels-photo-18513459.jpeg?auto=compress&cs=tinysrgb&w=1920";
  return (
    <>
      <title>文章 | Refined</title>
      <div className="">
        <PageBanner image={imageUrl} />
        <MotionFrame>
          <div
            className={` z-10 flex min-h-[calc(85vh-115px)] w-full flex-col bg-[#efefef] bg-cover bg-center dark:bg-[#202022]`}
          >
            <Card className="my-5 h-full w-full self-center bg-[#efefef] dark:bg-[#262628]  sm:w-[80%] md:w-[50%] lg:w-[50%]">
              <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10">
                <h1 className="header-font text-2xl dark:text-gray-300">
                  文章 | Articles
                </h1>
                <p className="content-font text-medium text-gray-500 dark:text-gray-400">
                  文字、记忆与思考
                </p>
              </CardHeader>
              <Divider />
              <CardBody>
                <ArticleTextCardList />
              </CardBody>
            </Card>
          </div>
        </MotionFrame>
      </div>
    </>
  );
}
