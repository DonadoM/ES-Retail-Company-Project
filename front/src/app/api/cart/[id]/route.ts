import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CartItem from '@/models/cartItem';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const body = await req.json();
    const updatedItem = await CartItem.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating cart item', error: (error as Error).message }, { status: 400 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
  
    try {
      const deletedItem = await CartItem.findByIdAndDelete(params.id);
      if (!deletedItem) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error) {
      return NextResponse.json({ message: 'Error deleting cart item', error: (error as Error).message }, { status: 400 });
    }
  }
  