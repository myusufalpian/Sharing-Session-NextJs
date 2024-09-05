import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/store/authSlice';
import { fetchApi } from '@/utils/api';
import Button from '../elements/Button';
import InputForm from '../elements/Input';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FormSignIn = (): JSX.Element => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const username = (document.getElementById('username') as HTMLInputElement).value;
			const password = (document.getElementById('password') as HTMLInputElement).value;
			const response = await fetchApi(`auth/login`, 'POST', { username, password });	
			const data = await (await response).json();
			if (response.status === 200) {
				dispatch(setToken(data.token));
				localStorage.setItem('Authorization', data.token);
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
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <InputForm htmlfor={'username'} type={'text'} placeholder={'example@email.com'} name={'username'} id={'username'}>Username</InputForm>
        <InputForm htmlfor={'password'} type={'password'} placeholder={'************'} name={'password'} id={'password'}>Password</InputForm>
      </div>
      <Button variant='bg-blue-700' text='text-white' classname='w-full'>Sign In</Button>
    </form>
  );
}

export default FormSignIn;