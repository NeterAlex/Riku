import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { api } from "~/utils/api";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "~/styles/globals.css";
import Layout from "~/layouts/layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <Layout>
            <>
              <Component {...pageProps} />
              <link
                rel="stylesheet"
                href={
                  "https://192960944.r.cdn36.com/chinesefonts2/packages/lxgwwenkai/dist/LXGWWenKai-Bold/result.css"
                }
              />
              <link
                rel="stylesheet"
                href={
                  "https://192960944.r.cdn36.com/chinesefonts2/packages/jhlst/dist/京華老宋体v1_007/result.css"
                }
              />
            </>
          </Layout>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
