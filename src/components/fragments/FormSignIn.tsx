import { redirect } from "next/navigation";
import Button from "../elements/Button";
import InputForm from "../elements/Input";
import { Urls } from "@/constants/urls";

const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const response = await fetch(`${Urls.baseUrl}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.message);
    return;
  }
  localStorage.setItem('Authorization', data.token);
  alert('Login Successful');
  redirect('/auth/signin')
};

const FormSignIn = (): JSX.Element => {
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
