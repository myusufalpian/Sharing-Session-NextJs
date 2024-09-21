import InputForm from "@/components/elements/Input";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = (): JSX.Element => {
    const user = useSelector((state: any) => state.auth.user);
    useEffect(() => {
        console.log('User: ', user);
    },[]);
    
    return (
        <div className="flex w-screen h-screen">
            <main className="flex-1 p-6">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="mb-6 text-3xl font-bold text-blue-500 underline">Profile</h1>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <InputForm htmlfor={'username'} type={'text'} value={user?.username} name={'username'} id={'username'}>Username</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'email'} type={'email'} value={user?.email} name={'email'} id={'email'}>Email</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'firstName'} type={'text'} value={user?.firstName} name={'firstName'} id={'firstName'}>First Name</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'lastName'} type={'text'} value={user?.lastName} name={'lastName'} id={'lastName'}>Last Name</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'phone'} type={'text'} value={user?.phone} name={'phone'} id={'phone'}>Phone</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'birthDate'} type={'text'} value={user?.birthDate} name={'birthDate'} id={'birthDate'}>Birth Date</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <InputForm htmlfor={'gender'} type={'text'} value={user?.gender} name={'gender'} id={'gender'}>Gender</InputForm>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="image" className="mb-1">Profile Image:</label>
                            <img src={user?.image} alt="Profile" className="object-cover w-32 h-32 mb-2 rounded" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
