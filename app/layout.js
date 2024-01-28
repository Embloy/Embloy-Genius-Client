import React from 'react';
import './globals.css'
import {Lexend} from 'next/font/google'
import Navigation from "@/app/components/navigation";
import AppProvider from "@/app/components/misc/AppProvider";
import AuthWrapper from "@/app/components/misc/AuthWrapper";
import UserWrapper from "@/app/components/misc/UserContext";
import StoreWrapper from "@/app/components/misc/StoreWrapper";
import Bottom from "@/app/components/bottom";
import AppWrapper from "@/app/components/misc/AppWrapper";



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
