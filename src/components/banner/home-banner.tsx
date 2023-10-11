import {api} from "~/utils/api";
import {Button, Card, CardBody, CardFooter, Image, Spacer} from "@nextui-org/react";
import {useRouter} from "next/router";

export default function HomeBanner() {
    const {data} = api.article.getLatest.useQuery()
    const tagString = data?.tags.map(t => `#${t.name}`).join(' ')
    const dateString = data?.publishedAt.toLocaleDateString('zh-CN')
    const router = useRouter()
    return (
        <>
            <div className="w-[100vw]">
                <Card isFooterBlurred className="border-none w-screen max-h-[40vh] justify-center">
                    <Image alt="" removeWrapper className="object-cover" src={data?.image}/>
                    <CardBody className="flex-col justify-center">
                        <div>
                            <h1 className="header-font">{data?.title}</h1>
                        </div>
                    </CardBody>
                    <CardFooter
                        className="flex-col justify-center absolute before:rounded-xl rounded-large h-[100%] w-full shadow-2xl z-10 gap-5">
                        <p className="header-font text-3xl text-white/90">{data?.title}</p>
                        <p className="header-font text-medium text-white/80 content-font">{data?.desc}</p>
                        <Button variant="faded" className="bg-black/20 opacity-60 text-white/70"
                                onClick={() => void router.push(`/article/${data?.id}`)}>阅读</Button>
                        <div className="px-2 flex justify-between content-between header-font">
                            <div className="flex">
                                <p className="text-white/70 text-tiny header-font">@{data?.author.name}</p>
                                <Spacer x={1}/>
                                <p className="text-white/70 text-tiny header-font">{dateString}</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}