import NextAuthSessionProvider from '@/providers/sessionProvider'
import Navbar from './components/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <body className="w-screen h-screen flex flex-col bg-slate-950">
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthSessionProvider>
  )
}
