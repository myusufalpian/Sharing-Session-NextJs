import Button from "../elements/Button";
import InputForm from "../elements/Input";

const FormSignUp = () => {
    return(
        <form>
          <div className="mb-6">
            <InputForm htmlfor={'username'} type={'email'} placeholder={'example@email.com'} name={'username'} id={'username'}>Username</InputForm>
            <InputForm htmlfor={'firstname'} type={'text'} placeholder={'Your first name'} name={'firstname'} id={'firstname'}>First Name</InputForm>
            <InputForm htmlfor={'lastname'} type={'text'} placeholder={'Your last name'} name={'lastname'} id={'lastname'}>Last Name</InputForm>
            <InputForm htmlfor={'password'} type={'password'} placeholder={'************'} name={'password'} id={'password'}>Password</InputForm>
            <InputForm htmlfor={'confirm-password'} type={'password'} placeholder={'************'} name={'confirm-password'} id={'confirm-password'}>Confirm Password</InputForm>
          </div>
          <Button variant='bg-blue-700' text='text-white' classname = 'w-full'>Sign Up</Button>
        </form>
    )
}

export default FormSignUp;