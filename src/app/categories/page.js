'use client'
import { useState } from "react";
import Common from "../../../components/common";

export default function page(){
const [name,setName] = useState(null);

async function handleSave(e){
e.preventDefault();
console.log(name);

const data = await fetch('http://localhost:3000/api/categories',{
    method : 'POST',
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify({name : name})
})

if(data.ok){
    const resJson = await data.json();
    console.log('the response back is : ',resJson);
}else{
    const resError = await data.json();
    console.log('the error from the api received is',resError);
}

}

return (
<Common>
    
    <form className="flex flex-col w-[25%] gap-y-4" onSubmit={handleSave}>
    <h1 className="ml-3 font-bold text-blue-900 text-xl">Categories</h1>
        <label htmlFor="categories_name">Categories Name</label>
        <div className="flex gap-x-4">
        <input onChange={(e)=>{
            setName(e.target.value)
        }} value={name} name="categories_name" placeholder="enter the categories"></input>
        <button type="submit">Save</button>
        </div>
    </form>
</Common>
)

}