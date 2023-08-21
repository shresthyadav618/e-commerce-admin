
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
    {products && products.map((elm)=>{
        return <div className="mt-6">{elm.name}</div>
    })}
</Common>
    )
}