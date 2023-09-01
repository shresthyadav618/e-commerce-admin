
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
export async function POST(NextRequest){

    try{
        const reqBody = await NextRequest.json();
        console.log(reqBody);
        const {_id} = reqBody;
        const product = await productModel.findById(_id);
    
        
        if(product){
            console.log('found the product',product);
            console.log('TRYING TO POPULATE PARENT CATEGORY');
            
            await product?.populate('parentCategory');
            console.log('AFTER POPULATING WITH PARENT CATEGORY' , product);
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
        
        console.log('the error is : : : : :: : : ',err);
        return NextResponse.json({
            status : 500,
            error : 'There was some error getting back the product'
        })
    }

}
