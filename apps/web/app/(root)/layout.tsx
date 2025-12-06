import { Header } from "@/components/shared/header";
import LeftSidebar from "@/components/shared/left-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Header />
      <div className="w-full">
        <LeftSidebar />
        <div className="pl-72 pt-36">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
