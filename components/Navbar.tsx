"use client";
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function Navbar () {
    const [navOpen, setNavOpen] = useState(false)
    const navLinks = [
        {
            label: "Home",
            url: "/",
        },
        {
            label: "About Us",
            url: "/about"
        },
        {
            label: "New Post",
            url: "/post"
        },
        {
            label: "Feed",
            url: "/feed"
        },
    ]
    return (
        <main className="flex items-center justify-between md:px-10 md:py-2 p-3 shadow-md sticky top-0">
            <Link href={"/"} className="flex items-center gap-1">
                <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={800}
                    height={800}
                    className="w-10 h-10"
                />
                <p className="font-bold text-gray-800 text-xl italic">CampusLink</p>
            </Link>

            <div className="flex items-center gap-7 max-md:hidden">
                {
                    navLinks.map((item, index)=> (
                        <Link key={index} href={item.url} className="text-lg hover:text-[#36ADA3] transition-all duration-200">{item.label}</Link>
                    ))
                }
            </div>
            
            <Link href={"/auth/signin"} className="border flex items-center gap-2 rounded-full px-4 py-1 border-gray-700 text-lg hover:bg-black hover:text-white transition-all duration-200 max-md:hidden">
                <FiUser />
                Sign In
            </Link>

            <button onClick={()=> setNavOpen(!navOpen)} className="text-2xl md:hidden">
                {
                    navOpen ? <IoMdClose /> : <RiMenu3Line />
                }             
            </button>
        </main>
    )
}
