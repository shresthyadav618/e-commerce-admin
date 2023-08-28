
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
export async function POST(NextRequest){

    try{
        const reqBody = await NextRequest.json();
        console.log(reqBody);
        const {_id} = reqBody;
        const product = await productModel.findById(_id);
        if(product){
            console.log(product);
            return NextResponse.json({
                status : 200,
                product
            })
        }else{
            return NextResponse.json({
                status : 500,
                error : 'unable to find the product'
            })
        }

    }catch(err){
        return NextResponse.json({
            status : 500,
            error : 'There was some error getting back the product'
        })
    }

}
