import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
  };
}

export function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  } as any);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async (data: any) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    if (data.image[0]) {
      try {
        const imageUrl = await uploadImage(data.image[0]);
        formData.append("imageUrl", imageUrl);
      } catch (error) {
        setError("Error al subir la imagen. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
        return;
      }
    } else if (initialData?.imageUrl) {
      formData.append("imageUrl", initialData.imageUrl);
    } else {
      setError("Se requiere una imagen para el producto.");
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setError("Error al guardar el producto. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Backend");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dma2liitz/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error:", errorData);
      throw new Error(
        `Error al subir la imagen: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del producto</Label>
        <Input
          id="name"
          {...register("name", { required: "Este campo es obligatorio" })}
        />
        {errors.name && typeof errors.name.message === "string" && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          {...register("description", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.description &&
          typeof errors.description.message === "string" && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
      </div>

      <div>
        <Label htmlFor="price">Precio</Label>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Este campo es obligatorio",
            min: 0,
          })}
        />
        {errors.price && typeof errors.price.message === "string" && (
          <p className="text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category">Categoría</Label>
        <Input
          id="category"
          {...register("category", { required: "Este campo es obligatorio" })}
        />
        {errors.category && typeof errors.category.message === "string" && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          type="number"
          id="stock"
          {...register("stock", {
            required: "Este campo es obligatorio",
            min: 0,
          })}
        />
        {errors.stock && typeof errors.stock.message === "string" && (
          <p className="text-red-500">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Imagen del producto</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", { required: !initialData?.imageUrl })}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Vista previa"
            className="mt-2 max-w-xs"
          />
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading
          ? "Guardando..."
          : initialData?._id
          ? "Actualizar Producto"
          : "Crear Producto"}
      </Button>
    </form>
  );
}
