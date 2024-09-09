import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUser } from '@/redux/store/authSlice';
import { fetchApi } from '@/utils/api';
import Button from '../elements/Button';
import InputForm from '../elements/Input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RootState } from '@/redux/store/store';

const FormSignIn = (): JSX.Element => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const response = await fetchApi(`auth/login`, 'POST', { username, password });	
            const data = await response.json();
            
            if (response.status === 200) {
                // Save token and user info in Redux store
                dispatch(setAuth(data.token));
                const user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    image: data.image
                };
                dispatch(setUser(user));
                localStorage.setItem('Authorization', data.token);
                localStorage.setItem('User', JSON.stringify(user));
                alert('Sign In Successful');
                router.push('/');
            } else {
                alert(`Sign In Failed, ${data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(`Sign In Failed, ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <div className="mb-6">
                <InputForm htmlfor={'username'} type={'text'} placeholder={'example@email.com'} name={'username'} id={'username'}>Username</InputForm>
                <InputForm htmlfor={'password'} type={'password'} placeholder={'************'} name={'password'} id={'password'}>Password</InputForm>
            </div>
            <Button variant='bg-gray-900 w-full' text='text-white'>Sign In</Button>
        </form>
    );
}

export default FormSignIn;
