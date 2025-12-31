// Force all auth pages to be dynamically rendered (no SSG)
// This is required because Clerk hooks need runtime context
export const dynamic = "force-dynamic";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-auth-light bg-center dark:bg-auth-dark bg-[url('/auth-bg.png')] bg-no-repeat bg-cover ">
      {children}
    </main>
  );
};
export default AuthLayout;
