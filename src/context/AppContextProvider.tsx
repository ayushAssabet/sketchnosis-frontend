'use client'
import { AuthProvider } from "./AuthContextProvider"
import SidebarProvider from "./SidebarContextProvider"

const AppContextProvider : React.FC<{
    children : React.ReactNode
}> = (
    {
        children
    }
) => {
    return(
        <>
            <AuthProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </AuthProvider>
        </>
    )
}

export default AppContextProvider