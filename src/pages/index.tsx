import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      router.push('/auth/signin');
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-3xl font-bold text-blue-500 underline">Dashboard</h1>
    </div>
  );
}
