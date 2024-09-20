import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";
import { useDispatch } from 'react-redux';
import { setUser } from "@/redux/store/authSlice";
import ErrorLayout from './../Error';
import { routeList, routeParamList, routeDisabledSidebar } from "@/constants/urls";

interface Props {
    children?: ReactNode;
}

const AppShell = ({ children }: Props): JSX.Element => {
    const router = useRouter();
    const { asPath } = router; // Use asPath for the full path
    const dispatch = useDispatch();
    const [error, setError] = useState<{ statusCode: number; message: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
        const isValidBaseRoute = routeList.includes(asPath);
        const isValidParamRoute = routeParamList.some(pattern => pattern.test(asPath));
        const isValidRoute = isValidBaseRoute || isValidParamRoute;
        if (!isValidRoute && !routeDisabledSidebar.includes(asPath)) {
            setError({ statusCode: 404, message: 'Page Not Found' });
        } else {
            setError(null);
        }
    }, [dispatch, asPath]);

    if (error) {
        return <ErrorLayout statusCode={error.statusCode} message={error.message} />;
    }

    return (
        <div className="flex h-screen">
            {!routeDisabledSidebar.includes(asPath) && <Sidebar />}
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
};

export default AppShell;
