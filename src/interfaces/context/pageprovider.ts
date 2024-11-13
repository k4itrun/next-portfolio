import { ReactNode } from 'react';

export type PageContextType = {
    page: string;
};

export type PageProviderProps = {
    children: ReactNode;
    value?: string;
};
