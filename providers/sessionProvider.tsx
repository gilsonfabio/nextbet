'use client'

import { ReactNode } from "react";
import { SessionProvider } from 'next-auth/react'

interface NextAuthSessionProviderProps {
	children: ReactNode
}

export default function NextAuthSessionProvider({children}: NextAuthSessionProviderProps, {session}: any){
	return <SessionProvider session={session}>{children}</SessionProvider>
}