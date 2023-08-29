import { NextResponse } from "next/server";
export async function POST(NextRequest){

    try{
        console.log('inside the api route handler');
const reqBody = await NextRequest.json();
console.log(reqBody);
const {name} = reqBody;

console.log('the name received is : ',name);
return NextResponse.json({
    status: 200,
    name
});
    }catch(error){
return NextResponse.json({
    status : 500,
    error : 'there was some error sending back the response',error
})
    }
}
