import { Button } from "@nextui-org/react";
import { Search } from "iconoir-react";
import { useRouter } from "next/router";

export default function SearchButton() {
  const router = useRouter();
  return (
    <>
      <Button
        isIconOnly
        variant="light"
        className="items-center opacity-60"
        onClick={() => void router.push("/search")}
      >
        <Search />
      </Button>
    </>
  );
}
