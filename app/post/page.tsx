"use server"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PostClient from "./post"

export default async function Post () {
    const session = await auth()
    if(!session){
        redirect("/auth/signin")
    }
    return (
        <main className="min-h-dvh">
            <PostClient session={session}/>
        </main>
    )
}