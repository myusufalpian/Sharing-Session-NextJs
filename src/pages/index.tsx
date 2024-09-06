// pages/index.tsx (or pages/home.tsx)
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "@/components/layouts/Sidebar";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      router.push('/auth/signin');
    }
  }, [router]);

  return (
    <div className="flex w-screen h-screen">
      <main className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-blue-500 underline">Dashboard</h1>
        </div>
      </main>
    </div>
  );
}
