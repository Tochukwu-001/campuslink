"use client";
import { SessionProvider } from "next-auth/react";


export default function Providers ({children}) {
    return (
        <main>
            <SessionProvider>
                {children}
            </SessionProvider>
        </main>
    )
}