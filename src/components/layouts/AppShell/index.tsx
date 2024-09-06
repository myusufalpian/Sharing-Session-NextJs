import { ReactNode } from "react";
import { useRouter } from "next/router";
import Sidebar from "../Sidebar";

interface Props {
  children?: ReactNode;
}

const disabled = ["/auth/signin", "/auth/signup"];

const AppShell = ({ children }: Props): JSX.Element => {
  const { pathname } = useRouter();
  
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
