import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb'; 
import CartItem from '@/models/cartItem'; 

// Obtener todos los artículos del carrito
export async function GET() {
  try {
    await connectDB();
    const items = await CartItem.find();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.error();
  }
}

// Agregar un artículo al carrito
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newItem = new CartItem(data);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}

// Actualizar un artículo en el carrito
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { quantity } = await req.json();
    const updatedItem = await CartItem.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.error();
  }
}

// Eliminar un artículo del carrito
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() || '';
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return NextResponse.error();
  }
}
