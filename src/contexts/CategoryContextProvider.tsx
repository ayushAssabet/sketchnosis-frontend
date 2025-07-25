import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { createContext, ReactNode } from "react";
import useSWR from "swr";

interface CategoryContextProps {
    mutateCategory: () => void;
    categories: Array<Record<string, any>>;
    isLoading: boolean;
}

export const CategoryContext = createContext<CategoryContextProps>({
    mutateCategory: () => {},
    categories: [],
    isLoading: false,
});

interface CategoryProviderProps {
    children: ReactNode;
}

const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    
    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/area-of-concern`,
        defaultFetcher
    );

    return (
        <CategoryContext.Provider
            value={{
                mutateCategory: mutate,
                categories: data?.data || [],
                isLoading,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
