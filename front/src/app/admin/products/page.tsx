'use client'

import { useState, useEffect } from 'react';
import { ProductForm } from '@/components/Admin/ProductForm';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://backend-service-9xuv.onrender.com/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const url = editingProduct 
        ? `https://backend-service-9xuv.onrender.com/api/products/${editingProduct._id}` 
        : 'https://backend-service-9xuv.onrender.com/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', response.status, errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please check the console for more details.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`https://backend-service-9xuv.onrender.com/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={handleSubmit} initialData={editingProduct || undefined} />
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
      {loading ? (
        <div className="text-center">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-4">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
                )}
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-sm">Stock: {product.stock}</p>
                <div className="mt-2 space-x-2">
                  <Button onClick={() => setEditingProduct(product)}>Editar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(product._id)}>Eliminar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

