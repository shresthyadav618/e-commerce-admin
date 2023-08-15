"use client"
import { useSession } from "next-auth/react";

export default function Login() {
    
    const session = useSession();
    console.log(session)
    return (
      <div className="w-screen flex items-center justify-center h-screen">
        <button className="bg-white p-6 text-black" >Login with Google</button>
      </div>
    )
  }
  