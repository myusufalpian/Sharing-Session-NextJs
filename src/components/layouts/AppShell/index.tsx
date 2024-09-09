import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/redux/store/store';
import { setUser } from "@/redux/store/authSlice";

interface Props {
  children?: ReactNode;
}

const disabled = ["/auth/signin", "/auth/signup"];

const AppShell = ({ children }: Props): JSX.Element => {
  const { pathname } = useRouter();
  const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);
  
  return (
    <div className="flex h-screen">
      { !disabled.includes(pathname) && <Sidebar /> }
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
