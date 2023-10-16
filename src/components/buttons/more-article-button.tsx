import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function MoreArticleButton() {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col justify-center pb-5">
        <Button
          className="header-font w-full"
          color={theme === "light" ? "secondary" : "primary"}
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
