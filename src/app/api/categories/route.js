import { categoriesModel } from "@/models/categories";
import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
const handler = async(NextRequest)=>{
    console.log('the method is : ',NextRequest.method);
    connect();
    if(NextRequest.method==='POST'){
        try{
            console.log('inside the api route handler');
    const reqBody = await NextRequest.json();
    console.log(reqBody);
    const {name,parentCategory} = reqBody;
    console.log('the parent category is : ',parentCategory);
    const newCategory = await new categoriesModel({
        name : name,
        parent : parentCategory
    });
    await newCategory.save();
    
    console.log('the new category is saved : ',newCategory);
    return NextResponse.json({
        status: 200,
        newCategory
    });
        }catch(error){
    return NextResponse.json({
        status : 500,
        error : 'there was some error sending back the response',error
    })
        }
    }

    if(NextRequest.method === 'GET'){
        console.log('inside the get request');
        const categories = await categoriesModel.find({}).populate('parent');
        if(categories){
            console.log('the categories are found',categories);
            return NextResponse.json({
                status : 200,
                categories
            })
        }else{
            console.log('no category found');
            return NextResponse.json({
                status : 500,
                error : 'no category found'
            })
        }
    }
}


export { handler as GET, handler as POST };
