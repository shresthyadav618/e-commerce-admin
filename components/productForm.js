"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Common from "../components/common";

export default function ProductForm({name,desc,price,check,_id,images}){
    console.log(name,desc,price,check,_id)
    const Router = useRouter();
const [data,changeData] = useState({
    name : name || "",
    desc : desc || "",
    price: price || "",
    images : images || ""
}) ;
async function handleSubmit(e){
    e.preventDefault();
    console.log(data);

    if(check){
        const response = await fetch('http://localhost:3000/api/products/edit',{
            headers : {'Content-Type' : 'application/json'},
            method : 'PUT',
            body : JSON.stringify({...data,_id})
        });

        if(response.ok){
            const responseBody = await response.json();
            console.log('edited the product',responseBody);
            Router.push('/products');
            alert('edited your product');
        }else{
            const responseError = await response.json();
            console.log('unable to edit the product',responseError);
        }
    }else{
        const response = await fetch('http://localhost:3000/api/products/add',{
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(data),
        method : 'POST'
    });
   
    if(response.ok){
        const responseData = await response.json();
        console.log('the response came back',responseData);
        changeData(()=>{return {
            name : "",
            desc : "",
            price: ""
        }})
        alert('New Product Added successfully');
        Router.push('/products');
    }else{
        const responseError = await response.json();
        console.log('there was some error getting back the response',responseError);
    }
    }
}

async function uploadImages(e){
console.log(e);
const files = e.target?.files;
console.log(files);
if(files?.length>0){
 const data = new FormData();
 for(const file of files){
    data.append('file',file);
 }
 const response = await fetch('http://localhost:3000/api/upload',{
    method : 'POST',
    body : data
 });
 console.log(response);
 const bodyResponse = await response.json();
 console.log(bodyResponse);
}else{
    console.log('No file found')
}
}

return (<Common>
   <form className="flex flex-col w-[25%] gap-y-4">
   {check ?  <div className="p-[10px]">Edit Product</div>: <div className="p-[10px]">New Product</div>}
    <label  htmlFor="name">Product Name</label>
   <input value={data.name} onChange={(e)=>{changeData((prev)=>{return {...prev,name : e.target.value}})}} placeholder="Product Name" name="name"></input>
   
   <label htmlFor="photos">Photos</label>
   <label className="ml-2 btn font-normal cursor-pointer flex flex-col items-center justify-center gap-y-2" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
Upload
<input onChange={(e)=>{uploadImages(e)}} type="file" className="hidden"></input>
</label>
   <div>
    {images ? <div></div> : <div className="p-2">No photos for this product</div>}
   </div>
   
   <label htmlFor="desc">Description</label>
   <textarea value={data.desc} onChange={(e)=>{changeData((prev)=>{return {...prev,desc : e.target.value}})}} placeholder="Description" name="desc" ></textarea>
   <label htmlFor="price">Price (in RS)</label>
   <input value={data.price} onChange={(e)=>{changeData((prev)=>{return {...prev,price : e.target.value}})}} placeholder="Price" name="price"></input>
   
   {check ? <button onClick={(e)=>{handleSubmit(e)}}>Edit This Product</button> : <button onClick={(e)=>{handleSubmit(e)}}>Save</button>}
  
   </form>
</Common>)
}