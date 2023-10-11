/* eslint-disable @typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import {Button, Card, CardBody, CardHeader, Divider, Input,} from "@nextui-org/react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {MdEditor} from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {api} from "~/utils/api";
import {useRouter} from "next/router";

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
  const articleId = router.query.id;
  const { data } = api.article.getById.useQuery({
    id: Number(articleId),
  });
  const mutation = api.article.createNew.useMutation();
  const [content, setContent] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: createArticleForm) => {
    mutation.mutate({
      title: data.title,
      content: content,
      tags: data.tags.split(","),
      publishedAt: new Date(data.publishedAt),
      desc: data.desc,
      hidden: data.hidden,
      image: data.image,
    });
    //console.log({...data, content: content})
    return null;
  };

  return (
    <>
      <div className=" flex min-h-[calc(100vh-115px)] w-full flex-col bg-gradient-to-b from-[#efefef] to-[#efefef]">
        <Card className="my-5 h-full w-[70%] self-center ">
          <CardHeader className="flex justify-between px-5 align-middle">
            <p className="header-font align-baseline">新增文章</p>
            <Button
              className=""
              color="secondary"
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
                modelValue={content}
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
