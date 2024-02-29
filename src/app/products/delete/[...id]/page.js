"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Common from "../../../../../components/common";
export default function useDeleteId(){
    // const Router = useRouter();
    const BASE_URL = "https://e-commerce-admin-eight-mocha.vercel.app";
    const pathname = usePathname().split('/')[3].toString();
    console.log('inside delete',pathname)
    async function handleDelete(){
        const response = await fetch(BASE_URL + '/api/products/delete',{
            method : 'POST',
            body : JSON.stringify({_id : pathname}),
            headers : {'Content-Type':'application/json'}
        });
        if(response.ok){
            const responseBody = await response.json();
            console.log('product was deleted',responseBody);
            // Router.push('/products');
            window.location.href='/products';
        }else{
            const responseError = await response.json();
            console.log('some error',responseError);
        }
    }
    return(
        <Common><div className="flex flex-col gap-y-4">
            <div>Do you really want to Delete this product</div>
            <div className="flex gap-x-2"><button onClick={handleDelete}>Yes</button> <Link className="btn" href={`/products`}>No</Link></div>
            </div></Common>
    )
}