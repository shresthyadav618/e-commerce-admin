"use client"
import { signIn, useSession } from "next-auth/react";
// import { connect } from "../src/dbConfig/dbConfig";
import Nav from "./Nav";
export default function common({children}){
  // connect();
    const {data: session , status} = useSession();
    console.log(session);
    const userEmail = session?.user?.email;
    
    if(status ==="loading"){
      return  <p>Hang in there </p>
    }
    
    if(status ==="unauthenticated"){
      return <>
       <div className="w-screen flex items-center justify-center h-screen">
            <button className="bg-white p-6 text-black" onClick={()=>{signIn()}}>Login </button>
          </div>
      </>
    }
    
    if(status==="authenticated"){
      console.log(window.location.href.split('/')[3]);
      
      return <>
      <div className="bg-blue-900 min-h-screen flex p-4">
        <Nav/>
        <div className="bg-white text-black p-4 flex-grow">
      <p>
        {children}
      </p>
      {/* <button onClick={()=>{signOut()}}>Sign Out</button> */}
      </div>
      </div>
      </>
    }
    
}