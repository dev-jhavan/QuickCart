import { NextResponse } from "next/server"

export async function  GET(request) {
    try {
         const {userId} = getAuth(request)
         await connectDB()
         const user = await User.findById(userId)
         const {cartitems } = user

         return NextResponse.json({ success: true, cartItems})   
         
    } catch (error) {
        return NextResponse.json({ succes: false, message: error.message });
        
    }
    
}