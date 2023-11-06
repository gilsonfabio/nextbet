import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import ButtonLogout from "../components/ButtonLogout"
import { getServerSession } from "next-auth"

const AnteriorDashboard = async () => {
    const session = await getServerSession(nextAuthOptions)
    return (
      <div className="w-full h-full flexflex-col items-center justify-center ">
        <h1 className="text-white text-2xl ">Register Page</h1>
        <h1 className="text-2xl mb-8">Olá, {session?.user?.name}. Bem vindo(a)!</h1>
    	<ButtonLogout />
      </div>
      
    )
}

export default AnteriorDashboard ;