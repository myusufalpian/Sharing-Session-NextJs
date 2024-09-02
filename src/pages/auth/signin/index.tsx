import { redirect } from "next/navigation";
import { useEffect } from "react";
import FormSignIn from "@/components/fragments/FormSignIn";
import AuthLayout from "@/components/layouts/AuthLayout";

const SignIn = () : JSX.Element => {
    useEffect(() => {
        if (localStorage.getItem('Authorization')) {
            redirect('/')
        }
    }, []);

    return(
        <AuthLayout authTitle="Sign In" type= "signin"> 
            <FormSignIn />
        </AuthLayout>
    );
}

export default SignIn;