import { Header } from "@/components/shared/header";
import LeftSidebar from "@/components/shared/left-sidebar";
import RightSidebar from "@/components/shared/right-sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative min-h-screen background-light850_dark100">

            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="mx-auto flex w-full max-w-[1440px]">

                {/* LEFT */}
                <aside className="hidden lg:block w-[280px] shrink-0 text-white">
                    <LeftSidebar />
                </aside>

                {/* CONTENT */}
                <section
                    className="
            flex-1
            px-6
            pb-10
            pt-28
            sm:px-10
            lg:px-14
          "
                >
                    <div className="mx-auto w-full max-w-5xl shadow-2xl bg-dark-200">
                        {children}
                    </div>
                </section>

                {/* RIGHT */}
                <aside className="hidden xl:block w-[320px] shrink-0 text-white">
                    <RightSidebar />
                </aside>

            </div>
        </main>
    );
};

export default Layout;
