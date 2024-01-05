import React from 'react';
import './globals.css'
import {Lexend} from 'next/font/google'
import Navigation from "@/app/components/navigation";
import AuthWrapper from "@/app/components/misc/AuthWrapper";
import UserWrapper from "@/app/components/misc/UserContext";
import StoreWrapper from "@/app/components/misc/StoreWrapper";
import Bottom from "@/app/components/bottom";


const lexend = Lexend({subsets: ['latin']})

export const metadata = {
    title: 'embloy',
    description: 'Embloy Genius',
}

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={lexend.className}>
        <div className="bg-black flex flex-col items-center justify-center max-w-full ">
            <AuthWrapper>
                <UserWrapper>
                    <StoreWrapper>
                        <Navigation/>
                        <div className="flex flex-col items-center justify-center ">
                            {children}
                        </div>
                        <Bottom/>
                    </StoreWrapper>
                </UserWrapper>
            </AuthWrapper>
        </div>
        </body>
        </html>
    )
}
