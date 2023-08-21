
// "use client"
import Link from "next/link";
import Common from "../../../components/common";
// console.log(window.location.href.split('/')[3]);
export default function page(){
    console.log('inside products')
    return(
<Common> 

<Link href={'/products/new'} className="bg-blue-900 text-white p-4 rounded-xl">Add New Product</Link>
    
</Common>
    )
}