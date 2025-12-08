import RightSidebar from "@/components/shared/right-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pr-[360px]">{children}</div>
      <RightSidebar />
    </>
  );
};
export default Layout;
