import React from 'react';
import '@/app/globals.css'
import { Lexend } from 'next/font/google'
import Navigation from "@/app/components/dom/navigation";
import AppProvider from "@/app/components/dom/main/wrappers/AppProvider";
import AuthWrapper from "@/app/components/dom/main/wrappers/AuthWrapper";
import UserWrapper from "@/app/components/dom/main/wrappers/UserContext";
import StoreWrapper from "@/app/components/dom/main/wrappers/StoreWrapper";
import Bottom from "@/app/components/dom/bottom";
import AppWrapper from "@/app/components/dom/main/wrappers/AppWrapper";
import { siteConfig } from '@/config/site';
import Head from 'next/head';

const lexend = Lexend({ subsets: ['latin'] })

export const metadata = {
    title: 'Embloy Genius',
    description: 'Embloy Genius',
    keywords: [
        "Next.js",
        "HR",
        "Genius",
        "Integrations",
        "Lightweight",
        "Embloy",
        "Embloy Platforms",
    ],
    authors: [{
        name: "embloy",
        url: "https://embloy.com",
      },
    ],
    creator: "embloy",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
          {
            url: "https://embloy.com/opengraph-image.jpg?5669f67eac8f9423",
            width: 1200,
            height: 630,
            alt: "Embloy",
          },
        ],
      },

    
}

export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <Head>
                <title>Embloy Genius</title>
                <meta name="description" content="Recruiter Portal" />
                <meta property="og:url" content="https://embloy.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Embloy Genius" />
                <meta property="og:description" content="Recruiter Portal" />
                <meta property="og:image" content="https://embloy.com/opengraph-image.jpg?5669f67eac8f9423" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="genius.embloy.com" />
                <meta property="twitter:url" content="https://genius.embloy.com" />
                <meta name="twitter:title" content="Embloy Genius" />
                <meta name="twitter:description" content="Recruiter Portal" />
                <meta name="twitter:image" content="https://embloy.com/opengraph-image.jpg?5669f67eac8f9423" />
            </Head>
            <body className={lexend.className}>
                <AppProvider >
                    <AuthWrapper>
                        <UserWrapper>
                            <StoreWrapper>
                                <AppWrapper>
                                    <Navigation />
                                    <div className="flex flex-col items-center justify-center w-full" >
                                        {children}
                                    </div>
                                    <Bottom />
                                </AppWrapper>
                            </StoreWrapper>
                        </UserWrapper>
                    </AuthWrapper>
                </AppProvider>
            </body>
        </html>
    )
}
