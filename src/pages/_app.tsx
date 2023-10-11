import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {type AppType} from "next/app";
import {NextUIProvider} from '@nextui-org/react'
import {api} from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/layouts/layout";

const MyApp: AppType<{ session: Session | null }> = ({
                                                         Component,
                                                         pageProps: {session, ...pageProps},
                                                     }) => {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </NextUIProvider>
        </SessionProvider>

    );
};

export default api.withTRPC(MyApp);
