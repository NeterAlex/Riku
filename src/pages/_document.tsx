import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  // noinspection JSUnresolvedLibraryURL
  return (
    <Html>
      <Head>
        <meta name="blog of NeterAlex" content="NeterAlex's blog Refined" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
