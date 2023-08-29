import { categoriesModel } from "@/models/categories";
import { NextResponse } from "next/server";
export async function POST(NextRequest){

    try{
        console.log('inside the api route handler');
const reqBody = await NextRequest.json();
console.log(reqBody);
const {name} = reqBody;

const newCategory = await new categoriesModel({
    name : name
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
