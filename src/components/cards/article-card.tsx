import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export interface ArticleCardProps {
  title: string;
  category: string;
  time: string;
  desc: string;
  author: string;
  img: string;
  id: number;
}

export default function ArticleCard(props: ArticleCardProps) {
  const { title, category, time, desc, author, img, id } = props;
  const router = useRouter();
  return (
    <>
      <Card
        isPressable
        isHoverable
        onPress={() => void router.push(`/article/${id}`)}
        className="w-[22%] flex-grow-0 transform  bg-[#efefef] py-2 transition duration-200 ease-in-out hover:scale-[101%] dark:bg-[#6f6f6f]"
      >
        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
          <Image
            isBlurred
            width={2000}
            alt={title}
            className="rounded-xl object-cover "
            src={img}
          />
          <h4 className="header-font mt-3 px-1 text-left text-large font-bold">
            {title}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="content-font text-small font-bold text-gray-500">
            {desc}
          </p>
        </CardBody>
        <CardFooter>
          <div className="header-font flex w-full content-between justify-between px-2 ">
            <div className="flex">
              <p className="text-tiny font-bold text-secondary">{author}</p>
              <Spacer x={1} />
              <p className="text-tiny font-bold text-gray-600">{category}</p>
            </div>
            <div className="flex">
              <small className="content-font text-tiny text-default-500">
                {time}
              </small>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
