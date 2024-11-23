'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
}

export default function EditPromotionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [promotion, setPromotion] = useState<Promotion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/promotions/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPromotion(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching promotion:', error)
          setError('Error fetching promotion')
          setLoading(false)
        })
    }
  }, [id])

  const handleSave = async () => {
    if (!promotion) return

    try {
      const response = await fetch(`/api/promotions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      })

      if (response.ok) {
        toast.success('Promotion updated successfully')
        router.push('/admin/promotions')
      } else {
        console.error('Error saving promotion:', response.statusText)
        toast.error('Error saving promotion')
      }
    } catch (error) {
      console.error('Error saving promotion:', error)
      toast.error('Error saving promotion')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Edit Promotion</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Input
          placeholder="Code"
          value={promotion?.code || ''}
          onChange={(e) => setPromotion(promotion ? { ...promotion, code: e.target.value } : null)}
          required
        />
        <Input
          placeholder="Description"
          value={promotion?.description || ''}
          onChange={(e) => setPromotion(promotion ? { ...promotion, description: e.target.value } : null)}
          required
        />
        <Select 
          value={promotion?.discountType || 'percentage'} 
          onValueChange={(value: 'percentage' | 'fixed') => setPromotion(promotion ? { ...promotion, discountType: value } : null)}
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
          value={promotion?.discountValue || 0}
          onChange={(e) => setPromotion(promotion ? { ...promotion, discountValue: parseFloat(e.target.value) } : null)}
          required
        />
        <Input
          type="date"
          placeholder="Start Date"
          value={promotion?.startDate || ''}
          onChange={(e) => setPromotion(promotion ? { ...promotion, startDate: e.target.value } : null)}
          required
        />
        <Input
          type="date"
          placeholder="End Date"
          value={promotion?.endDate || ''}
          onChange={(e) => setPromotion(promotion ? { ...promotion, endDate: e.target.value } : null)}
          required
        />
        <Checkbox
          checked={promotion?.isActive || false}
          onCheckedChange={(checked) => setPromotion(promotion ? { ...promotion, isActive: checked === true } : null)}
        >
          Active
        </Checkbox>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}