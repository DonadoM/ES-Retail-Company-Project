'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-hot-toast'

interface Promotion {
  _id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  startDate: string
  endDate: string
  isActive: boolean
  minimumPurchaseAmount: number
  usageLimit: number
}

export default function EditPromotionPage({ params }: { params: { id: string } }) {
  const [promotion, setPromotion] = useState<Promotion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPromotion()
  }, [])

  const fetchPromotion = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch promotion')
      }
      const data = await response.json()
      setPromotion(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch promotion')
      setLoading(false)
      toast.error('Failed to fetch promotion')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promotion) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      })
      if (!response.ok) {
        throw new Error('Failed to update promotion')
      }
      toast.success('Promotion updated successfully')
      router.push('/admin/promotions')
    } catch (err) {
      toast.error('Failed to update promotion')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!promotion) return <div>No promotion found</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Promotion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Promotion Code"
          value={promotion.code}
          onChange={(e) => setPromotion({ ...promotion, code: e.target.value })}
          required
        />
        <Input
          placeholder="Description"
          value={promotion.description}
          onChange={(e) => setPromotion({ ...promotion, description: e.target.value })}
          required
        />
        <Select 
          value={promotion.discountType} 
          onValueChange={(value: 'percentage' | 'fixed') => setPromotion({ ...promotion, discountType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Discount Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="fixed">Fixed Amount</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Discount Value"
          value={promotion.discountValue}
          onChange={(e) => setPromotion({ ...promotion, discountValue: Number(e.target.value) })}
          required
        />
        <Input
          type="date"
          placeholder="Start Date"
          value={promotion.startDate.split('T')[0]}
          onChange={(e) => setPromotion({ ...promotion, startDate: e.target.value })}
          required
        />
        <Input
          type="date"
          placeholder="End Date"
          value={promotion.endDate.split('T')[0]}
          onChange={(e) => setPromotion({ ...promotion, endDate: e.target.value })}
          required
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={promotion.isActive}
            onCheckedChange={(checked) => setPromotion({ ...promotion, isActive: checked as boolean })}
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is Active
          </label>
        </div>
        <Input
          type="number"
          placeholder="Minimum Purchase Amount"
          value={promotion.minimumPurchaseAmount}
          onChange={(e) => setPromotion({ ...promotion, minimumPurchaseAmount: Number(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Usage Limit"
          value={promotion.usageLimit}
          onChange={(e) => setPromotion({ ...promotion, usageLimit: Number(e.target.value) })}
        />
        <Button type="submit">Update Promotion</Button>
      </form>
    </div>
  )
}

