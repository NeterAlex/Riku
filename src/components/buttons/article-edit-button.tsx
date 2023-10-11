import { Button, Tooltip } from "@nextui-org/react";
import { EditPencil } from "iconoir-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

interface props {
  articleId: string;
}

export default function ArticleEditButton(props: props) {
  const { articleId } = props;
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <>
      <Tooltip
        color={theme === "light" ? "secondary" : "primary"}
        content={"编辑"}
        closeDelay={200}
      >
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="items-center opacity-60"
          onClick={() => void router.push(`/article/edit/${articleId}`)}
        >
          <EditPencil
            className="text-secondary dark:text-primary"
            stroke={"2"}
          />
        </Button>
      </Tooltip>
    </>
  );
}
