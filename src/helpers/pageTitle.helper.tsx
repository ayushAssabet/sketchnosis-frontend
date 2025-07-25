import Head from "next/head";

export const pageTitleHelper = (title: string) => {
    return (
        <Head>
            <title>SKECHNOSIS | {title}</title>
        </Head>
    );
};
