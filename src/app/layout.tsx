import '@/styles/globals.css';
import { meta } from '@k4itrun/config';
import { ContextMenu } from '@/components/client/context/ContextMenu';
import { Cursor } from '@/components/client/context/Cursor';
import { Footer } from '@/components/client/Footer';
import { Nav } from '@/components/client/Nav';
import { PageProvider } from '@/components/client/context/PageProvider';
import { ThemeProvider } from '@/components/client/context/ThemeProvider';
import { ProgressBar } from '@/components/client/Progress';
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: {
    default: meta.title,
    template: `%s | ${meta.title}`,
  },
  description: meta.shortDescription,
  twitter: {
    title: meta.title,
    description: meta.shortDescription,
    creator: "@k4itrunnofound",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" rel="stylesheet" />
        </head>
        <body>
          <ThemeProvider>
            <PageProvider>
              <ProgressBar />
              <Cursor />
              <ContextMenu >
                <main className="border-black/10 dark:border-black border-b-[8px] border-t-[0px] h-full w-full">
                  <div className="min-h-screen max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                    <Nav />
                    {children}
                  </div>
                </main>
                <Footer />
              </ContextMenu>
              <div className="color-layout layout-primary position-right-top" />
              <div className="color-layout layout-secondary position-left-bottom" />
            </PageProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};