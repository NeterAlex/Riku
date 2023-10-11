import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    // noinspection JSUnresolvedLibraryURL
    return (
        <Html>
            <Head>
                <meta name="blog of NeterAlex" content="NeterAlex's blog Refined"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel='stylesheet'
                      href='https://192960944.r.cdn36.com/chinesefonts2/packages/lxgwwenkai/dist/LXGWWenKai-Bold/result.css'/>
                <link rel='stylesheet'
                      href='https://192960944.r.cdn36.com/chinesefonts2/packages/jhlst/dist/京華老宋体v1_007/result.css'/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}