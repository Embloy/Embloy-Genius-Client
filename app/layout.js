import React from 'react';
import '@/app/globals.css'
import {Lexend} from 'next/font/google'
import Navigation from "@/app/components/dom/navigation";
import AppProvider from "@/app/components/dom/main/wrappers/AppProvider";
import AuthWrapper from "@/app/components/dom/main/wrappers/AuthWrapper";
import UserWrapper from "@/app/components/dom/main/wrappers/UserContext";
import StoreWrapper from "@/app/components/dom/main/wrappers/StoreWrapper";
import Bottom from "@/app/components/dom/bottom";
import AppWrapper from "@/app/components/dom/main/wrappers/AppWrapper";



const lexend = Lexend({subsets: ['latin']})

export const metadata = {
    title: 'Embloy Genius',
    description: 'Embloy Genius',
}

export default function RootLayout({children}) {

    return (
        <html lang="en">
            <body className={lexend.className}>
                    <AppProvider >
                        <AuthWrapper>
                            <UserWrapper>
                                <StoreWrapper>
                                    <AppWrapper>
                                        <Navigation/>
                                        <div className="flex flex-col items-center justify-center " >
                                            {children}
                                        </div>
                                        <Bottom/>
                                    </AppWrapper>
                                </StoreWrapper>
                            </UserWrapper>
                        </AuthWrapper>
                    </AppProvider>
            </body>
        </html>
    )
}
