'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-hot-toast'

export default function AddPromotionPage() {
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage')
  const [discountValue, setDiscountValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState('')
  const [usageLimit, setUsageLimit] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          description,
          discountType,
          discountValue: Number(discountValue),
          startDate,
          endDate,
          isActive,
          minimumPurchaseAmount: Number(minimumPurchaseAmount),
          usageLimit: Number(usageLimit),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to add promotion')
      }
      toast.success('Promotion added successfully')
      router.push('/admin/promotions')
    } catch  {
      toast.error('Failed to add promotion')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Add Promotion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Promotion Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Select value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
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
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked as boolean)}
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
          value={minimumPurchaseAmount}
          onChange={(e) => setMinimumPurchaseAmount(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Usage Limit"
          value={usageLimit}
          onChange={(e) => setUsageLimit(e.target.value)}
        />
        <Button type="submit">Add Promotion</Button>
      </form>
    </div>
  )
}

