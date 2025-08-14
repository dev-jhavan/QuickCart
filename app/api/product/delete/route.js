import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// DELETE: /api/product/delete?id=PRODUCT_ID
export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);
    console.log("Usuário autenticado:", userId);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: 'Not authorized' });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    console.log("ID do produto:", productId);

    if (!productId) {
      return NextResponse.json({ success: false, message: 'Product ID is required' });
    }

    await connectDB();
    console.log("Conectado ao banco");

    const product = await Product.findOne({ _id: productId, userId });
    console.log("Produto encontrado:", product);

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found or unauthorized' });
    }

    await product.deleteOne();

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
