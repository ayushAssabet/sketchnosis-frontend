import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { createContext, ReactNode } from "react";
import useSWR from "swr";

interface IllustrationContextProps {
    mutateIllustration: () => Promise<void>;
    illustration: Array<Record<string, any>>;
    isLoading: boolean;
}

export const IllustrationContext = createContext<IllustrationContextProps>({
    mutateIllustration: async() => {},
    illustration: [],
    isLoading: false,
});

interface IllustrationProviderProps {
    children: ReactNode;
}

const IllustrationProvider: React.FC<IllustrationProviderProps> = ({
    children,
}) => {
    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/illustration`,
        defaultFetcher
    );

    return (
        <IllustrationContext.Provider
            value={{
                mutateIllustration: mutate,
                illustration: data?.data?.data || [],
                isLoading,
            }}
        >
            {children}
        </IllustrationContext.Provider>
    );
};

export default IllustrationProvider;
