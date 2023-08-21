"use client"
import { useState } from "react";
import Common from "../../../../components/common";
export default function page(){
    const [data,changeData] = useState({
        name : "",
        desc : "",
        price: ""
    }) ;
    async function handleSubmit(e){
        e.preventDefault();
        console.log(data);

        const response = await fetch('http://localhost:3000/api/products/add',{
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(data),
            method : 'POST'
        });

        if(response.ok){
            const responseData = await response.json();
            console.log('the response came back',responseData);
        }else{
            const responseError = await response.json();
            console.log('there was some error getting back the response',responseError);
        }
    }
    return (<Common>
       <form className="flex flex-col w-[25%] gap-y-4">
        <div className="p-[10px]">New Product</div>
        <label  htmlFor="name">Product Name</label>
       <input onChange={(e)=>{changeData((prev)=>{return {...prev,name : e.target.value}})}} placeholder="Product Name" name="name"></input>
       <label htmlFor="desc">Description</label>
       <textarea onChange={(e)=>{changeData((prev)=>{return {...prev,desc : e.target.value}})}} placeholder="Description" name="desc" ></textarea>
       <label htmlFor="price">Price (in RS)</label>
       <input onChange={(e)=>{changeData((prev)=>{return {...prev,price : e.target.value}})}} placeholder="Price" name="price"></input>
       
       <button onClick={(e)=>{handleSubmit(e)}}>Save</button>
      
       </form>
    </Common>)
}