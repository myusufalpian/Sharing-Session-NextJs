import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/store/authSlice';
import { fetchApi } from '@/utils/api';
import Button from '../elements/Button';
import InputForm from '../elements/Input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomAlert from './CustomAlert';

const FormSignIn = (): JSX.Element => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>('info');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setIsLoading(true);

        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (!username) {
            setAlertMessage('Username is a mandatory field. It cannot be empty.');
            setAlertType('error');
            setShowAlert(true);
            setIsLoading(false);
            return;
        }
        if (!password) {
            setAlertMessage('Password is a mandatory field. It cannot be empty.');
            setAlertType('error');
            setShowAlert(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetchApi(`auth/login`, 'POST', { username, password });	
            const data = await response.json();
            if (response.status === 200) {
                dispatch(setAuth(data.token));
                localStorage.setItem('Authorization', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setAlertMessage('Sign In Successful');
                setAlertType('success');
                setShowAlert(true);
                setIsSuccess(true);
            } else {
                setAlertMessage(`Sign In Failed, check your credentials!`);
                setAlertType('error');
                setShowAlert(true);
                setIsSuccess(false);
            }
        } catch (error) {
            setAlertMessage(`Sign In Failed: ${error}`);
            setAlertType('error');
            setShowAlert(true);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        if (isSuccess) {
            router.push('/');
        }
    };

    return (
        <>
            <form onSubmit={handleSignIn}>
                <div className="mb-6">
                    <InputForm htmlfor={'username'} type={'text'} placeholder={'example@email.com'} name={'username'} id={'username'}>Username</InputForm>
                    <InputForm htmlfor={'password'} type={'password'} placeholder={'************'} name={'password'} id={'password'}>Password</InputForm>
                </div>
                <Button variant='bg-gray-900 w-full' text='text-white'>Sign In</Button>
            </form>
            {showAlert && (
                <CustomAlert message={alertMessage} onClose={closeAlert} type={alertType} />
            )}
        </>
    );
}

export default FormSignIn;
