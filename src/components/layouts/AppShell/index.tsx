import { ReactNode } from "react";
import Navbar from "../Navbar";
import {useRouter} from "next/router";

interface Props {
    children?: ReactNode;
    pathname?: string;
}

const disabledNavbar = ["/auth/signin", "/auth/signup"];
const AppShell = (props: Props) : JSX.Element => {
    const {pathname} = useRouter();
    const {children} = props;
    return (
        <main>
            { !disabledNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell;