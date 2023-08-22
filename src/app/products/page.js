
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Common from "../../../components/common";
export default function page(){
console.log('inside products')
const [products, changeProducts] = useState(null);
console.log(products);
useEffect(()=>{
async function getProducts(){
console.log('inside the get products function')
const response = await fetch('http://localhost:3000/api/products',{
    method : 'GET'
});

if(response.ok){
const details = await response.json();
console.log(details);
changeProducts(()=>{return details.productsExists});
}else{
    const responseError = await response.json();
    console.log('error fetching the details of the product',responseError);
}

}
getProducts();
},[])
    return(
<Common> 

<Link href={'/products/new'} className="bg-blue-900 text-white p-4 rounded-xl mb-6">Add New Product</Link>
<table className="mt-6 basic w-full">
    
    <thead className="w-full"><tr><td>Product Name</td> <td></td></tr> </thead>
       
    {products && products.map((elm)=>{
        
        return <tr><td>{elm.name}</td> <td className=""><Link href={`/products/edit/${elm._id}`}  className="p-4 btn flex items-center  gap-x-4">Edit  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg> </Link> 
       </td></tr>
    })}
    
    
    </table>
</Common>
    )
}