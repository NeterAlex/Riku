import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { HalfMoon, SunLight } from "iconoir-react";

export default function DarkModeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        isIconOnly
        className="items-center"
        onClick={() => void setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? <HalfMoon /> : <SunLight />}
      </Button>
    </>
  );
}
