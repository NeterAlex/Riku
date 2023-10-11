import HeaderNavbar from "~/layouts/navbar";
import {type ReactElement} from "react";
import Footer from "~/layouts/footer";

export default function Layout({children}: { children: ReactElement }) {
    return (
        <>
            <HeaderNavbar/>
            <main className="light text-foreground bg-background">
                {children}
            </main>
            <Footer/>
        </>
    )
}