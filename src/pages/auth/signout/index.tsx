import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOutPage = () : JSX.Element => {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem('Authorization');
        router.push('/auth/signin').then( () => {
            window.location.reload();
        });
    }, [router]);
    return(
        <></>
    )
}

export default SignOutPage;