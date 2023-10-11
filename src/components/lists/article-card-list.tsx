import {api} from "~/utils/api";
import ArticleCard from "~/components/cards/article-card";

export default function ArticleCardList() {
    const {data: articleList} = api.article.getAllWithPagination.useQuery({pageIndex: 1, pageSize: 50})
    return (
        <>
            <div className="flex flex-wrap py-5 gap-5 content-center justify-center">
                {
                    articleList?.slice(1).map((a) => {
                        // 处理信息
                        const tagString = a.tags.map(t => `#${t.name}`).join(' ')
                        const dateString = a.publishedAt.toLocaleDateString('zh-CN')

                        return (
                            <ArticleCard key={a.id} id={a.id} title={a.title} category={tagString} time={dateString}
                                         desc={a.desc} author={a.author.name ?? 'GUEST'} img={a.image}/>
                        )
                    })
                }
            </div>
        </>
    )
}

