"use client";
import { Suspense } from "react";
import { AuthProvider } from "./AuthContextProvider";
import SidebarProvider from "./SidebarContextProvider";

const AppContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <>
            <Suspense>
                <AuthProvider>
                    <SidebarProvider>{children}</SidebarProvider>
                </AuthProvider>
            </Suspense>
        </>
    );
};

export default AppContextProvider;
