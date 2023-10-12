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
} from "@nextui-org/react";
import { Search } from "iconoir-react";
import { useState } from "react";

export default function SearchPage() {
  const bannerImage =
    "https://images.pexels.com/photos/221538/pexels-photo-221538.jpeg?auto=compress&cs=tinysrgb&w=1920";

  const [selected, setSelected] = useState<string[]>(["on-title"]);
  const searchCondition: Record<string, string> = {
    "on-title": "按标题",
    "on-tag": "按标签",
    "on-author": "按作者",
  };
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
                <div></div>
              </div>

              <div className="flex w-full justify-between align-bottom">
                <h1 className="header-font text-2xl dark:text-gray-300">
                  搜索 | Search
                </h1>
                <CheckboxGroup
                  label=""
                  orientation="horizontal"
                  color="secondary"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Checkbox
                    value="on-title"
                    onChange={() => void setSelected(["on-title"])}
                  >
                    标题
                  </Checkbox>
                  <Checkbox
                    value="on-author"
                    onChange={() => void setSelected(["on-author"])}
                  >
                    作者
                  </Checkbox>
                  <Checkbox
                    value="on-tag"
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
                  startContent={<Search />}
                  type="search"
                />
                <div className="flex flex-nowrap">
                  <Button
                    variant="shadow"
                    color="primary"
                    endContent={<Search />}
                  >
                    搜索
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div></div>
            </CardBody>
          </Card>
        </div>
      </>
    </MotionFrame>
  );
}
