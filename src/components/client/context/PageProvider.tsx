'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface IPageContextType {
  page: string;
}

const PageContext = createContext<IPageContextType | undefined>(undefined);

export const usePage = (): IPageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

export const PageProvider = ({ children, value }: { children: ReactNode; value?: string }) => {
  const pathname = usePathname();

  const [page, setPage] = useState<string>(value || pathname);

  useEffect(() => {
    setPage(pathname === '/_error' ? '/error' : pathname);
  }, [pathname]);

  return <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>;
};
