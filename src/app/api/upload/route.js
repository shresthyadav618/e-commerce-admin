import { IncomingForm } from 'formidable';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';
export async function POST(NextRequest) {
  const form = new IncomingForm();
  form.uploadDir = './public/uploads'; // Set the directory to store uploads

  try {
   const formData = await NextRequest.formData();
    const file = formData.get('file');
    console.log("form-data",file,formData);
    

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('/','tmp',file.name);
    await writeFile(path,buffer);
    console.log(`open ${path} to see the file`)

    return NextResponse.json({status : 200,msg: 'this is right'})
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 500,
      error: err.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
