import MotionFrame from "~/components/frame/motion-frame";
import PageBanner from "~/components/banner/page-banner";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function AboutPage() {
  const headerImage =
    "https://images.pexels.com/photos/247421/pexels-photo-247421.jpeg?auto=compress&cs=tinysrgb&w=1920";
  return (
    <>
      <title>关于 | Refined</title>
      <PageBanner image={headerImage} />
      <MotionFrame>
        <div
          className={`z-10 flex min-h-[calc(85vh-115px)] w-full flex-col bg-[#efefef] bg-cover bg-center dark:bg-[#202022]`}
        >
          <Card className="my-5 h-full w-full  self-center bg-[#efefef] dark:bg-[#262628] sm:w-[80%] md:w-[65%] lg:w-[50%]">
            <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10">
              <div className="flex w-full justify-between">
                <div className="flex gap-2"></div>
                <div></div>
              </div>

              <h1 className="header-font text-2xl dark:text-gray-300">
                关于 | About
              </h1>
              <p className="content-font text-medium text-gray-500 dark:text-gray-400">
                感谢你的到来。
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex h-full flex-col gap-2 px-5">
                <h1 className="content-font text-medium dark:text-gray-300">
                  你好，
                </h1>
                <p className="content-font text-medium dark:text-gray-300">
                  这里是 NeterAlex，欢迎你到访我的博客。
                </p>
                <p className="content-font text-medium dark:text-gray-300">
                  我是一名CS专业学生，是偶尔用二胡和钢琴做菜的厨师，是用锅铲演奏音乐的音乐爱好者。
                </p>
                <p className="content-font text-medium dark:text-gray-300">
                  闲暇时喜欢写些文字，有几个弃坑状态的小说。另外，我对语言学有一些很粗浅的了解，大概是兴趣使然吧。
                </p>
                <p className="content-font text-medium dark:text-gray-300">
                  除了练琴、料理和摆弄文字，我还会玩很多游戏，尤其是
                  JRPG，欢迎一起交流。
                </p>
                <p className="content-font text-medium dark:text-gray-300">
                  博客使用 Next.js + tRPC
                  制作，主要用来分享自己的一些笔记和碎碎念。
                </p>
                <p></p>
                <p className="content-font text-medium dark:text-gray-300">
                  以上，祝你诸事顺遂。
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </MotionFrame>
    </>
  );
}
