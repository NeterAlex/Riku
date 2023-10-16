import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Listbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { type ReactElement, useState } from "react";
import { Search } from "iconoir-react";
import { ListboxItem } from "@nextui-org/listbox";
import { useTheme } from "next-themes";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface props {
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function SearchModal({ isOpen, onOpenChange }: props) {
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
  const router = useRouter();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="header-font flex flex-col gap-1">
                搜索 | Search
              </ModalHeader>
              <ModalBody>
                <div className="content-font flex-col items-start justify-start gap-2">
                  <div className="mb-5 flex w-full flex-col gap-2 align-bottom">
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
                    <div className="flex w-full justify-between">
                      <div className="flex items-center justify-between">
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
                  </div>
                  <div>
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
                            onAction={(key) => {
                              onClose();
                              void router.push(`/article/${key}`);
                            }}
                          >
                            {(article) => (
                              <ListboxItem key={article.id}>
                                <div className="flex justify-between">
                                  <div className="header-font flex gap-2 dark:text-gray-400">
                                    <p>{article.title}</p>
                                  </div>
                                  <div>
                                    <p className="text-secondary">
                                      {article.tags
                                        .map((t) => `#${t.name}`)
                                        .join(" ")}
                                    </p>
                                  </div>
                                </div>
                              </ListboxItem>
                            )}
                          </Listbox>
                        </ListboxWrapper>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
const ListboxWrapper = ({ children }: { children: ReactElement }) => (
  <div className="w-full rounded-small py-2 dark:border-default-700">
    {children}
  </div>
);
