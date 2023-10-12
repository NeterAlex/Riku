import MotionFrame from "~/components/frame/motion-frame";
import PageBanner from "~/components/banner/page-banner";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Listbox,
} from "@nextui-org/react";
import { Search } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { api } from "~/utils/api";
import { ListboxItem } from "@nextui-org/listbox";
import { useTheme } from "next-themes";

export default function SearchPage() {
  const bannerImage =
    "https://images.pexels.com/photos/221538/pexels-photo-221538.jpeg?auto=compress&cs=tinysrgb&w=1920";
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string[]>(["on-title"]);
  const searchCondition: Record<string, string> = {
    "on-title": "按标题",
    "on-tag": "按标签",
    "on-author": "按作者",
  };
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, status, refetch } = api.article.searchByCategory.useQuery(
    {
      type: selected[0]!,
      values: searchValue,
    },
    { refetchOnWindowFocus: false, enabled: false },
  );

  return (
    <MotionFrame>
      <>
        <PageBanner image={bannerImage} />
        <div
          className={`z-10 flex min-h-[calc(85vh-115px)] w-full flex-col bg-[#efefef] bg-cover bg-center dark:bg-[#202022]`}
        >
          <Card className="my-5 h-full w-[50%] max-w-[60vw] self-center bg-[#efefef] dark:bg-[#262628]">
            <CardHeader className="content-font flex-col items-start justify-start gap-2 px-10 pb-5 pt-10">
              <div className="flex w-full justify-between">
                <div className="flex gap-2"></div>
              </div>

              <div className="flex w-full justify-between align-bottom">
                <h1 className="header-font text-2xl dark:text-gray-200">
                  搜索 | Search
                </h1>
                <CheckboxGroup
                  orientation="horizontal"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Checkbox
                    value="on-title"
                    color={theme === "light" ? "secondary" : "primary"}
                    onChange={() => void setSelected(["on-title"])}
                  >
                    标题
                  </Checkbox>
                  <Checkbox
                    value="on-author"
                    color={theme === "light" ? "secondary" : "primary"}
                    onChange={() => void setSelected(["on-author"])}
                  >
                    作者
                  </Checkbox>
                  <Checkbox
                    value="on-tag"
                    color={theme === "light" ? "secondary" : "primary"}
                    onChange={() => void setSelected(["on-tag"])}
                  >
                    标签
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div className="flex w-full justify-between gap-2 align-bottom">
                <Input
                  classNames={{
                    base: "max-w-full h-10",
                    mainWrapper: "h-full",
                    input: "text-small header-font",
                    inputWrapper:
                      "h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder={`${searchCondition[selected[0]!]}搜索`}
                  type="search"
                  value={searchValue}
                  onValueChange={(e) => setSearchValue(e)}
                />
                <div className="flex flex-nowrap">
                  <Button
                    variant="shadow"
                    color={theme === "light" ? "secondary" : "primary"}
                    endContent={<Search />}
                    onClick={() => void refetch()}
                  >
                    搜索
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {status === "loading" ? (
                <div className="flex items-center justify-center">
                  <p className="header-font">请输入关键词</p>
                </div>
              ) : (
                <div className="w-full">
                  <ListboxWrapper>
                    <Listbox
                      className="w-full"
                      items={data}
                      aria-label="搜索到的文章"
                      onAction={(key) => alert(key)}
                    >
                      {(article) => (
                        <ListboxItem key={article.id}>
                          <div className="flex justify-between">
                            <div className="header-font flex gap-2 dark:text-gray-400">
                              <p>{article.title}</p>
                              <p className="text-primary">
                                {article.tags
                                  .map((t) => `#${t.name}`)
                                  .join(" ")}
                              </p>
                            </div>

                            <div className="content-font flex gap-2">
                              <p className="">@{article.author.name}</p>
                              <p>
                                {article.publishedAt.toLocaleDateString(
                                  "zh-CN",
                                )}
                              </p>
                            </div>
                          </div>
                        </ListboxItem>
                      )}
                    </Listbox>
                  </ListboxWrapper>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </>
    </MotionFrame>
  );
}

const ListboxWrapper = ({ children }: { children: ReactElement }) => (
  <div className="w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100 dark:border-default-700">
    {children}
  </div>
);
