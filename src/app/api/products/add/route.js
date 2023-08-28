
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
connect();

export async function POST(NextRequest){
    try{
        const reqBody = await NextRequest.json();
    const {name,desc,price,images} = reqBody;
    console.log(name,desc,price,images);
    
    const newProduct = await new productModel({
        name : name,
        desc : desc,
        price: price,
        images : images
    });

    const savedProduct = await newProduct.save();
    console.log('new product has been added',savedProduct);
    return NextResponse.json({
        status : 200,
        savedProduct
    })
    }catch(err){
        return NextResponse.json({
            status : 500,
            error : 'there was some error while saving ur product',err
        })
    }
}