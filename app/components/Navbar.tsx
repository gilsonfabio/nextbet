"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import ButtonLogout from "./ButtonLogout";

export default function Navbar() {
    const { data: session} = useSession();

    return (
        <div className="w-full h-20 flex flex-row items-center justify-between bg-slate-300 px-2 md:px-28">
            <Link href={'/'} className="text-black text-3xl font-bold hover:text-green-600 hover:cursor-pointer">
                LOGO
            </Link>
            {!session ?
            <div className="w-[1/4] flex flex-row items-center justify-between ">
                <Link href={'/Register'} className="text-black text-md font-bold hover:text-green-600 hover:cursor-pointer mr-10">
                    Registre-se
                </Link>
                <div className="bg-green-500 hover:bg-green-600 hover:cursor-pointer px-4 rounded-lg h-10 flex items-center">
                    <Link href={'/Login'} className="text-black text-md font-bold">
                        Login
                    </Link>
                </div>
            </div>
            : 
            <div className="w-[1/4] flex flex-row items-center justify-between ">
                <Link href={'/Register'} className="text-black text-md font-bold hover:text-green-600 hover:cursor-pointer mr-10">
                    Ola´ {session.user?.name}, Bem-vindo! -  {session.user.id}
                </Link>
                <ButtonLogout />
            </div>
            }
        </div>        
    )
  }
  