"use client";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useRouter } from "next/navigation";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";
import {
    clearTokens,
    getAccessToken,
    setTokens,
} from "@/helpers/cookie.helper";
import { appRoutes } from "@/lib/routes";

interface User {
    id: string;
    email: string;
    name: string;
    image: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    refreshToken: () => Promise<boolean>;
    fetchUser: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const refreshToken = async (): Promise<boolean> => {
        const tokens = getAccessToken();
        const refreshToken = tokens?.refreshToken;

        if (!refreshToken) return false;

        try {
            const response = await fetch(
                `${BACKEND_HOST}/v1/auth/refresh-token`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            setTokens(data.access_token, data.refresh_token || refreshToken);
            return true;
        } catch (error) {
            console.error("Token refresh error:", error);
            clearTokens();
            return false;
        }
    };

    const fetchUser = async (): Promise<void> => {
        setLoading(true);
        console.log("fetchinguserfrom provider", loading);
        const tokens = getAccessToken();
        const accessToken = tokens?.accessToken;

        console.log(accessToken);
        if (!accessToken) return;

        try {
            const response = await fetch(`${BACKEND_HOST}/v1/auth/user-data`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            });

            console.log(response);

            if (response.status === 401) {
                // Try to refresh token
                const refreshed = await refreshToken();
                if (refreshed) {
                    return fetchUser(); // Retry with new token
                }
                throw new Error("Unauthorized");
            }

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();
            setUser(data?.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            return;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        const tokens = getAccessToken();
        const accessToken = tokens?.accessToken;
        const refreshToken = tokens?.refreshToken;

        try {
            if (accessToken) {
                await fetch(`${BACKEND_HOST}/api/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            clearTokens();
            setUser(null);
            router.push(appRoutes.LOGIN_INDEX_PAGE);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);
            try {
                await fetchUser();
            } catch (error) {
                console.error("Authentication initialization error:", error);
                clearTokens();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        refreshToken,
        setUser,
        fetchUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
