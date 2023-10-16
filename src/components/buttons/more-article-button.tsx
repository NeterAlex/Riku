import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function MoreArticleButton() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center pb-5">
        <Button
          className="header-font w-full"
          color="secondary"
          variant="light"
          radius="none"
          onClick={() => void router.push("/article")}
        >
          阅读更多
        </Button>
      </div>
    </>
  );
}
