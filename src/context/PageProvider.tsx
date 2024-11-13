import { PageContextType, PageProviderProps } from "@/interfaces";

import { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePage = (): PageContextType => {
    const context = useContext(PageContext);
    if (!context) throw new Error('usePage must be used within a PageProvider');
    return context;
}

export const PageProvider = ({ children, value }: PageProviderProps) => {
    const router = useRouter();

    const getPage = useMemo(() => {
        return router.pathname === '/_error' ? '/error' : router.pathname;
    }, [router.pathname]);

    const [page, setPage] = useState<string>(value || '/');

    useEffect(() => {
        setPage(getPage);
    }, [getPage]);

    return (
        <PageContext.Provider value={{ page }}>
            {children}
        </PageContext.Provider>
    );
}