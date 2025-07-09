import { getAccessToken } from "./cookie.helper";

interface ApiRequestConfig {
  url: string;
  method: string;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}

export const createApiRequest = () => {
    const makeRequest = async ({ url, method, body, headers = {} }: ApiRequestConfig) => {
        try {
        const config: RequestInit = {
            method: method.toUpperCase(),
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${getAccessToken().accessToken}`,
            ...headers
            }
        };

        if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            config.body = JSON.stringify(body);
        }

        const res = await fetch(url, config);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        return await res.json();
        } catch (error) {
        throw error;
        }
    };
    return { makeRequest };
};

