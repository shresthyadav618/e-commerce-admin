
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
connect();

export  async function GET(NextRequest){

try{
    const productsExists = await productModel.find({});
if(productsExists){

    console.log('found the products',productsExists);
    return NextResponse.json({
        status : 200,
        productsExists
    });

}else{
    return NextResponse.json({
        status: 404,
        error : 'it says there is no product present inside the db to fetch'
    })
}
}catch(err){
    return NextResponse.json({
        status : 404,
        error : 'there was some error getting the details of the products',err
    })
}

}