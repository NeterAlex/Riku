/* eslint-disable @typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import {Button, Card, CardBody, CardHeader, CircularProgress, Divider, Input,} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {MdEditor, type Themes} from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import {useTheme} from "next-themes";
import {formatDate} from "~/utils/timeutils";

interface createArticleForm {
  title: string;
  content: string;
  tags: string;
  publishedAt: Date;
  image: string;
  desc: string;
  hidden: boolean;
}

export default function EditArticle() {
  const router = useRouter();
  const { theme } = useTheme();
  const articleId = router?.query.id ?? 0;
  const { data, status } = api.article.getById.useQuery({
    id: Number(articleId),
  });
  const tagString = data?.tags.map((t) => `${t.name}`).join(",");
  const mutation = api.article.updateById.useMutation({
    onSuccess: () => {
      void router.push(`/article/${Number(articleId)}`);
    },
  });
  const [content, setContent] = useState(data?.content);
  // 设置初始值
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title ?? "",
      image: data?.image ?? "",
      tags: tagString ?? "",
      desc: data?.desc ?? "",
      publishedAt: data?.publishedAt ?? "",
    },
  });

  useEffect(() => {
    const rawDate = new Date(data?.publishedAt ?? "");
    reset({
      title: data?.title ?? "",
      image: data?.image ?? "",
      tags: tagString ?? "",
      desc: data?.desc ?? "",
      publishedAt: formatDate(rawDate),
    });
    setContent(data?.content);
  }, [
    data?.content,
    data?.desc,
    data?.image,
    data?.publishedAt,
    data?.title,
    reset,
    status,
    tagString,
  ]);

  const onSubmit = (data: createArticleForm) => {
    mutation.mutate({
      id: Number(articleId),
      title: data.title,
      content: content!,
      tags: data.tags.split(","),
      publishedAt: new Date(data.publishedAt),
      desc: data.desc,
      hidden: false,
      image: data.image,
    });
    return null;
  };

  if (status === "loading" || status === "error") {
    return (
      <>
        <div className=" flex min-h-[calc(100vh-115px)] w-full flex-col items-center justify-center bg-[#efefef] dark:bg-[#202022]">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" flex min-h-[calc(100vh-115px)] w-full flex-col bg-[#efefef] dark:bg-[#202022]">
        <Card className="my-5 h-full w-[70%] self-center dark:bg-[#262628] ">
          <CardHeader className="flex justify-between px-5 align-middle">
            <p className="header-font text-lg dark:text-gray-400">修改文章</p>
            <Button
              className=""
              color={theme === "light" ? "secondary" : "primary"}
              variant="shadow"
              isLoading={mutation.isLoading}
              onClick={
                //@ts-expect-error submit
                handleSubmit(onSubmit)
              }
            >
              提交
            </Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="pb-5">
              <form className="flex-col gap-3 ">
                <div className="mb-3 flex gap-3">
                  <Input
                    classNames={{
                      inputWrapper:
                        "text-default-600 bg-default-400/20 dark:bg-default-500/20 dark:text-default-400",
                    }}
                    isClearable
                    isRequired
                    isInvalid={!!errors?.title ?? false}
                    label="标题"
                    type="text"
                    placeholder="Title"
                    {...register("title", {
                      required: true,
                      maxLength: 254,
                    })}
                  />
                  <Input
                    isClearable
                    classNames={{
                      inputWrapper:
                        "text-default-600 bg-default-400/20 dark:bg-default-500/20 dark:text-default-400",
                    }}
                    isRequired
                    isInvalid={!!errors?.image ?? false}
                    label="题图URL"
                    type="text"
                    placeholder="Image URL"
                    {...register("image", { required: true })}
                  />

                  <Input
                    isClearable
                    isRequired
                    classNames={{
                      inputWrapper:
                        "text-default-600 bg-default-400/20 dark:bg-default-500/20 dark:text-default-400",
                    }}
                    isInvalid={!!errors?.tags ?? false}
                    label="Tags"
                    type="text"
                    placeholder="Tag1,Tag2..."
                    {...register("tags", { required: true })}
                  />
                </div>
                <div className="flex gap-3">
                  <Input
                    className=""
                    isClearable
                    classNames={{
                      inputWrapper:
                        "text-default-600 bg-default-400/20 dark:bg-default-500/20 dark:text-default-400",
                    }}
                    isRequired
                    isInvalid={!!errors?.desc ?? false}
                    label="简介"
                    type="text"
                    placeholder="Description"
                    {...register("desc", { required: true })}
                  />
                  <Input
                    className="w-1/3"
                    isClearable
                    classNames={{
                      inputWrapper:
                        "text-default-600 bg-default-400/20 dark:bg-default-500/20 dark:text-default-400",
                    }}
                    isRequired
                    isInvalid={!!errors?.publishedAt ?? false}
                    label="发布时间"
                    type="datetime-local"
                    placeholder="Publish Time"
                    {...register("publishedAt", { required: true })}
                  />
                </div>
              </form>
            </div>
            <div className="rounded-xl">
              <MdEditor
                theme={theme as Themes}
                modelValue={content!}
                onChange={setContent}
                toolbarsExclude={["github"]}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
