
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Home(){

const {data: session , status} = useSession();
console.log(session);
const userEmail = session?.user?.email;
if(status ==="loading"){
  return  <p>Hang in there </p>
}

if(status ==="unauthenticated"){
  return <>
   <div className="w-screen flex items-center justify-center h-screen">
        <button className="bg-white p-6 text-black" onClick={()=>{signIn('github')}}>Login </button>
      </div>
  </>
}

if(status==="authenticated"){
  return <>
  <p>
    Signed In as {userEmail}
  </p>
  <button onClick={()=>{signOut()}}>Sign Out</button>
  </>
}

  return(
    <div>Please <Link href={'/login'}>Login</Link> </div>
  )
}
