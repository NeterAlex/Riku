import { api } from "~/utils/api";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export default function HomeBanner() {
  const { data } = api.article.getLatest.useQuery();
  const dateString = data?.publishedAt.toLocaleDateString("zh-CN");
  const router = useRouter();
  return (
    <>
      <div className="w-[100vw]">
        <Card
          isFooterBlurred
          radius="none"
          className="max-h-[40vh] w-screen justify-center border-none"
        >
          <Image
            alt=""
            removeWrapper
            className="object-cover"
            src={data?.image}
          />
          <CardBody className="flex-col justify-center">
            <div>
              <h1 className="header-font">{data?.title}</h1>
            </div>
          </CardBody>
          <CardFooter className="absolute z-10 h-full w-full flex-col justify-center gap-5 shadow-2xl before:rounded-xl">
            <p className="header-font content-center text-center text-3xl text-white/90">
              {data?.title}
            </p>
            <p className="content-font content-center px-10 text-center text-medium text-white/80">
              {data?.desc}
            </p>
            <Button
              variant="faded"
              className="bg-black/20 text-white/70 opacity-60"
              onClick={() => void router.push(`/article/${data?.id}`)}
            >
              阅读
            </Button>
            <div className="header-font flex content-between justify-between px-2">
              <div className="flex">
                <p className="header-font text-tiny text-white/70">
                  @{data?.author.name}
                </p>
                <Spacer x={1} />
                <p className="header-font text-tiny text-white/70">
                  {dateString}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
