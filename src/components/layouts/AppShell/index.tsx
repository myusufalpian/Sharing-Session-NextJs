/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";
import { useDispatch } from 'react-redux';
import { setUser } from "@/redux/store/authSlice";
import ErrorLayout from './../Error';
import { 
    routeList, 
    routeParamList, 
    routeDisabledSidebar, 
    routeListDisabledAuth 
} from "@/constants/urls";
import { fetchApi, fetchApiWithToken } from "@/utils/api";

interface Props {
    children?: ReactNode;
}

const AppShell = ({ children }: Props): JSX.Element => {
    const router = useRouter();
    const { asPath } = router;
    const dispatch = useDispatch();
    const [error, setError] = useState<{ statusCode: number; message: string } | null>(null);
    let prevPathName: string = '';

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
        const handleRouteChange = () => {
            localStorage.setItem('previousPath', window.location.pathname);
        };
        handleRouteChange();
        const isValidBaseRoute = routeList.includes(asPath);
        const isValidParamRoute = routeParamList.some(pattern => pattern.test(asPath));
        const isValidRoute = isValidBaseRoute || isValidParamRoute;
        if (!isValidRoute && !routeDisabledSidebar.includes(asPath)) {
            setError({ statusCode: 404, message: 'Page Not Found' });
            return;
        }
        setError(null);
        if (!routeListDisabledAuth.includes(asPath)) {
            prevPathName = localStorage.getItem('previousPath') ?? '';
            getAuthData(prevPathName);
        }
    }, [dispatch, asPath]);
    

    const getAuthData = async (prevPath?: string) => {
        const token = localStorage.getItem('Authorization');
        const signInPath = '/auth/signin';
        const signOutPath = '/auth/signout';    
        const isOnSignInPage = asPath === signInPath;
        if (!token) {
            if (!isOnSignInPage) {
                alert('Not Authorized');
                router.push(signOutPath);
            }
            return;
        }
        try {
            const response = await fetchApiWithToken('auth/me', 'GET', token);
            if (response.status === 200) {
                const data = await response.json();
                const user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    gender: data.gender,
                    image: data.image,
                    phone: data.phone,
                    birthDate: data.birthDate,
                    bloodGroup: data.bloodGroup,
                    height: data.height,
                    weight: data.weight,
                    eyeColor: data.eyeColor,
                    maidenName: data.maidenName,
                };
                dispatch(setUser(user));
                localStorage.setItem('User', JSON.stringify(user));
            } else {
                await refreshToken();
            }
        } catch (error) {
            console.error('Error fetching auth data:', error);
        }
    };

    const refreshToken = async () => {
        const body = {
            refreshToken: localStorage.getItem('refreshToken'),
            expiresInMins: 60,
        };
        const responseRefreshToken = await fetchApi('auth/refresh-token', 'POST', body);
        
        if (responseRefreshToken.status === 200) {
            const data = await responseRefreshToken.json();
            localStorage.setItem('Authorization', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
        } else {
            alert('Unable to refresh token, please log in again.');
            router.push('/auth/signout');
        }
    };

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
