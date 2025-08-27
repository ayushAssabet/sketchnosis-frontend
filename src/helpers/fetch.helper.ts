import { useUserDeviceId } from "@/hooks/use-deviceId";
import { clearTokens, getAccessToken } from "./cookie.helper";
import { getDeviceId } from "./device.helper";

interface ApiRequestConfig {
    url: string;
    method: string;
    body?: Record<string, any> | FormData;
    headers?: Record<string, any>;
}

export const createApiRequest = () => {
    const makeRequest = async ({
        url,
        method,
        body,
        headers = {},
    }: ApiRequestConfig) => {
        try {
            const config: RequestInit = {
                method: method.toUpperCase(),
                headers: {
                    Authorization: `Bearer ${getAccessToken().accessToken}`,
                    ...headers,
                },
            };

            if (
                body &&
                ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
            ) {
                // Check if body is FormData or contains File objects
                if (body instanceof FormData) {
                    // Don't set Content-Type for FormData, let browser set it with boundary
                    config.body = body;
                } else if (hasFileObjects(body)) {
                    // Convert to FormData if body contains File objects
                    const formData = new FormData();

                    Object.entries(body).forEach(([key, value]) => {
                        if (value instanceof File) {
                            formData.append(key, value);
                        } else if (
                            Array.isArray(value) ||
                            typeof value === "object"
                        ) {
                            formData.append(key, JSON.stringify(value));
                        } else {
                            formData.append(key, String(value));
                        }
                    });

                    config.body = formData;
                } else {
                    // Regular JSON request
                    config.headers = {
                        ...config.headers,
                        "Content-Type": "application/json",
                    };
                    config.body = JSON.stringify(body);
                }
            }

            const res = await fetch(url, config);
            const data = await res.json();

            if (!res.ok) {
                if (res.status == 401) {
                    clearTokens();
                    window.location.href = "/";
                }
                throw new Error(data?.message);
            }

            return data;
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        }
    };

    return { makeRequest };
};

// Helper function to check if object contains File objects
function hasFileObjects(obj: any): boolean {
    if (!obj || typeof obj !== "object") return false;

    return Object.values(obj).some(
        (value) => value instanceof File || value instanceof Blob
    );
}

export async function defaultFetcher(url: string) {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken().accessToken}`,
            Accept: "application/json",
        },
    });

    if(response.status === 401){
      clearTokens()
      window.location.href = '/';
    }
    return response.json();
}


export async function userFetcher(url: string) {
    const {deviceId} = useUserDeviceId()
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            "visitor-key": deviceId,
        },
    });

    if(response.status === 401){
      clearTokens()
      window.location.href = '/';
    }
    return response.json();
}
