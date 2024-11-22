'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'react-hot-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface Promotion {
  _id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  startDate: string
  endDate: string
  isActive: boolean
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch promotions')
      }
      const data = await response.json()
      setPromotions(data)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch promotions: ${err.message}`)
      } else {
        setError('An unknown error occurred while fetching promotions')
      }
      setLoading(false)
      toast.error('Failed to fetch promotions')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete promotion')
      }
      setPromotions(promotions.filter(promo => promo._id !== id))
      toast.success('Promotion deleted successfully')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to delete promotion: ${err.message}`)
      } else {
        toast.error('An unknown error occurred while deleting the promotion')
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Promotions Management</h1>
      <Button onClick={() => router.push('/admin/promotions/add')} className="mb-5">
        Add New Promotion
      </Button>
      {promotions.length === 0 ? (
        <p>No promotions found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promo) => (
              <TableRow key={promo._id}>
                <TableCell>{promo.code}</TableCell>
                <TableCell>{promo.description}</TableCell>
                <TableCell>{promo.discountType === 'percentage' ? `${promo.discountValue}%` : `$${promo.discountValue}`}</TableCell>
                <TableCell>{new Date(promo.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(promo.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{promo.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/admin/promotions/edit/${promo._id}`)} className="mr-2">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(promo._id)} variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

