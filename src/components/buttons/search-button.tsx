import { Button } from "@nextui-org/react";
import { Search } from "iconoir-react";

interface props {
  onClick: () => void;
}

export default function SearchButton({ onClick }: props) {
  return (
    <>
      <Button
        isIconOnly
        variant="light"
        className="items-center opacity-60"
        onClick={() => onClick()}
      >
        <Search />
      </Button>
    </>
  );
}
