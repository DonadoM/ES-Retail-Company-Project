import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProductFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
    image?: FileList;
  };
}

export function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  const onSubmitForm = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== 'image') {
        formData.append(key, data[key]);
      }
    });
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }
    onSubmit(formData);
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
        <Input id="name" {...register('name', { required: 'Este campo es obligatorio' })} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" {...register('description', { required: 'Este campo es obligatorio' })} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="price">Precio</Label>
        <Input type="number" id="price" {...register('price', { required: 'Este campo es obligatorio', min: 0 })} />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <Label htmlFor="category">Categoría</Label>
        <Input id="category" {...register('category', { required: 'Este campo es obligatorio' })} />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input type="number" id="stock" {...register('stock', { required: 'Este campo es obligatorio', min: 0 })} />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      </div>

      <div>
        <Label htmlFor="image">Imagen del producto</Label>
        <Input type="file" id="image" accept="image/*" {...register('image')} onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Vista previa" className="mt-2 max-w-xs" />
        )}
      </div>

      <Button type="submit">
        {initialData ? 'Actualizar Producto' : 'Crear Producto'}
      </Button>
    </form>
  );
}

