import { useRouter } from "next/router";
import { fetchApiWithToken } from "@/utils/api";
import { useEffect, useState } from "react";

const Profile = () : JSX.Element => {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        token? fetchProfile(token) : router.push('/auth/me');
    }, [router]);

    const fetchProfile = async (token: string) => {
        const response = await fetchApiWithToken('auth/me', 'GET', token);
        if (response.status === 200) {
            const data = await (await response).json();
            setProfile(data);                       
        } else {
            alert('Not Authorized');
            router.push('/auth/signin');
        }
        console.log(response);
    };
    return (
        <div className="flex w-screen h-screen">
            <main className="flex-1 p-6">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="mb-6 text-3xl font-bold text-blue-500 underline">Profile</h1>
                    <img src={profile?.image} alt="" />
                    <p><strong>Username: </strong> {profile?.username}</p>
                    <p><strong>email: </strong> {profile?.email}</p>
                    <p><strong>First Name: </strong> {profile?.firstName}</p>
                    <p><strong>Last Name: </strong> {profile?.lastName}</p>
                    <p><strong>Phone: </strong> {profile?.phone}</p>
                    <p><strong>Birth Date: </strong> {profile?.birthDate}</p>
                    <p><strong>Gender: </strong> {profile?.gender}</p>
                </div>
            </main>
        </div>
    );
};

export default Profile;