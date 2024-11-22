"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Upload } from 'lucide-react'

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: FileList
}

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  initialData?: Partial<ProductFormData>
}

export function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: initialData
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFormSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value[0]) {
        formData.append(key, value[0])
      } else {
        formData.append(key, String(value))
      }
    })

    try {
      await onSubmit(formData)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{ backgroundColor: colors.background }}>
      <CardHeader className="bg-opacity-10" style={{ backgroundColor: colors.accent }}>
        <CardTitle className="text-2xl font-bold" style={{ color: colors.text }}>
          {initialData ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" style={{ color: colors.text }}>Nombre del producto</Label>
            <Input 
              id="name" 
              {...register('name', { required: 'Este campo es obligatorio' })}
              className="border-opacity-50 focus:border-opacity-100"
              style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" style={{ color: colors.text }}>Descripción</Label>
            <Textarea 
              id="description" 
              {...register('description', { required: 'Este campo es obligatorio' })}
              className="border-opacity-50 focus:border-opacity-100"
              style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" style={{ color: colors.text }}>Precio</Label>
              <Input 
                type="number" 
                id="price" 
                {...register('price', { required: 'Este campo es obligatorio', min: 0 })}
                className="border-opacity-50 focus:border-opacity-100"
                style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" style={{ color: colors.text }}>Stock</Label>
              <Input 
                type="number" 
                id="stock" 
                {...register('stock', { required: 'Este campo es obligatorio', min: 0 })}
                className="border-opacity-50 focus:border-opacity-100"
                style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" style={{ color: colors.text }}>Categoría</Label>
            <Input 
              id="category" 
              {...register('category', { required: 'Este campo es obligatorio' })}
              className="border-opacity-50 focus:border-opacity-100"
              style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" style={{ color: colors.text }}>Imagen del producto</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="file" 
                id="image" 
                accept="image/*" 
                {...register('image', { required: initialData ? false : 'Este campo es obligatorio' })}
                className="border-opacity-50 focus:border-opacity-100"
                style={{ borderColor: colors.accent, color: colors.text, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Upload className="text-gray-500" style={{ color: colors.accent }} />
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" style={{ backgroundColor: 'rgba(118, 171, 174, 0.2)', borderColor: colors.accent }}>
              <AlertTitle style={{ color: colors.accent }}>Éxito</AlertTitle>
              <AlertDescription style={{ color: colors.text }}>
                El producto se ha {initialData ? 'actualizado' : 'creado'} correctamente.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
            {isLoading ? 'Procesando...' : (initialData ? 'Actualizar Producto' : 'Crear Producto')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

