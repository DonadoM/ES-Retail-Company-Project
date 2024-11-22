"use client";

import { useState, useEffect } from "react";
import { ProductForm } from "@/components/Admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Package, DollarSign, Archive } from "lucide-react";

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

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
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/products"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const url = editingProduct
        ? `https://backend-service-9xuv.onrender.com/api/products/${editingProduct._id}`
        : "https://backend-service-9xuv.onrender.com/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server response:", response.status, errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }

      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      setError(
        "Failed to save product. Please check the console for more details."
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        const response = await fetch(
          `https://backend-service-9xuv.onrender.com/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  if (error) {
    return (
      <div className="p-4" style={{ backgroundColor: colors.background }}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 space-y-8"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: colors.accent }}
      >
        Gestión de Productos
      </h1>

      <Card
        className="mb-8 shadow-lg"
        style={{ backgroundColor: colors.background }}
      >
        <CardHeader
          className="bg-opacity-10"
          style={{ backgroundColor: colors.accent }}
        >
          <CardTitle
            className="text-2xl text-center"
            style={{ color: colors.text }}
          >
            {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ProductForm
            onSubmit={handleSubmit}
            initialData={editingProduct || undefined}
          />
        </CardContent>
      </Card>

      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: colors.accent }}
      >
        Lista de Productos
      </h2>
      {loading ? (
        <div className="text-center py-10">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: colors.accent }}
          ></div>
          <p className="mt-4" style={{ color: colors.text }}>
            Cargando productos...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <CardContent className="p-0">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: colors.accent }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-sm flex items-center"
                    style={{ color: colors.text }}
                  >
                    <Package
                      size={16}
                      className="mr-2"
                      style={{ color: colors.accent }}
                    />
                    {product.category}
                  </p>
                  <p
                    className="text-lg font-semibold flex items-center"
                    style={{ color: colors.text }}
                  >
                    <DollarSign
                      size={16}
                      className="mr-1"
                      style={{ color: colors.accent }}
                    />
                    {product.price.toFixed(2)}
                  </p>
                  <p
                    className="text-sm flex items-center"
                    style={{ color: colors.text }}
                  >
                    <Archive
                      size={16}
                      className="mr-2"
                      style={{ color: colors.accent }}
                    />{" "}
                    Stock: {product.stock}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <Button
                      onClick={() => setEditingProduct(product)}
                      className="text-white"
                      style={{ backgroundColor: colors.accent }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(product._id)}
                      className="text-white"
                      style={{ backgroundColor: "#e11d48" }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

