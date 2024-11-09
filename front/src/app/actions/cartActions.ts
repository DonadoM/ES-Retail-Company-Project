'use server'

interface CartItemType {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
}

export const getCartItems = async () => {
  try {
    const response = await fetch('/api/cart');
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addCartItem = async (item: Partial<CartItemType>) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (id: string, quantity: number) => {
  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeCartItem = async (id: string) => {
  try {
    console.log("ID: ", id);
    const response = await fetch(`/api/cart/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to remove cart item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
  