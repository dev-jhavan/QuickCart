import { v2 as cloudinary } from "cloudinary";
import {getAuth} from '@clerk/nextjs/server'
//
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secre: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request){
    try {
        
        const {userId} = getAuth(request)

        const isSellller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({sucess: false, message: 'not authorized'})
        }

        const formData = await request.formData()

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('price');
        const price = formData.get('price');
        const offerPrice = formData.get('price');

        const files = formData.getAll('images')

        if (!files || files.length === 0 ){
            return NextResponse.json({ sucess: false, message: 'no files uploaded'})
        }

        const result = await Promisse.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream(
                    {resource_type: 'auto'},
                    (error,result) =>{
                        if (error) {
                            reject(error)
                        } else {
                            stream.end(buffer)
                        }
                    }
                )    
                })  
            })
        )

        const image = result.map(result => result.secure_url)

        await connectDB()
        const newProduct = await Product.creat({
            userId,
            name,
            description,
            category,
            price:Number(offerPrice),
            image,
            date: Date.now()
        })

            return NextResponse.json({ sucess: true, message:'Upload successful', newProduct})
    } catch (error) {
        NextResponse.json({ sucess:false, message: errror.message})
    }
}