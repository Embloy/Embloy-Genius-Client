import './globals.css'
import {Lexend} from 'next/font/google'
import Navigation from "@/app/components/navigation";

const lexend = Lexend({subsets: ['latin']})

export const metadata = {
    title: 'embloy',
    description: 'Embloy Genius',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={lexend.className}>
                <div className="bg-black" >
                    <Navigation />
                        {children}
                </div>
            </body>
        </html>
    )
}
