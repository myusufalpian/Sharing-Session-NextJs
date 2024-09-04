import { useEffect } from "react";
import FormSignIn from "@/components/fragments/FormSignIn";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useRouter } from 'next/router';

const SignIn = () : JSX.Element => {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('Authorization')) {
            router.push('/')
        }
    }, []);

    return(
        <AuthLayout authTitle="Sign In" type= "signin"> 
            <FormSignIn />
        </AuthLayout>
    );
}

export default SignIn;