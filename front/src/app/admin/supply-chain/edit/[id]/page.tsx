'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface SupplyChainItem {
  _id: string
  itemName: string
  sku: string
  quantity: number
  supplier: string
  status: 'Ordered' | 'In Transit' | 'Received' | 'Quality Check' | 'In Stock'
  expectedDeliveryDate: string
  actualDeliveryDate?: string
}

export default function EditSupplyChainItemPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<SupplyChainItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supply-chain/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch supply chain item')
      }
      const data = await response.json()
      setItem(data)
      setLoading(false)
    } catch  {
      setError('Failed to fetch supply chain item')
      setLoading(false)
      toast.error('Failed to fetch supply chain item')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!item) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supply-chain/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
      if (!response.ok) {
        throw new Error('Failed to update supply chain item')
      }
      toast.success('Supply chain item updated successfully')
      router.push('/admin/supply-chain')
    } catch {
      toast.error('Failed to update supply chain item')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!item) return <div>No item found</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Supply Chain Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Item Name"
          value={item.itemName}
          onChange={(e) => setItem({ ...item, itemName: e.target.value })}
          required
        />
        <Input
          placeholder="SKU"
          value={item.sku}
          onChange={(e) => setItem({ ...item, sku: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
          required
        />
        <Input
          placeholder="Supplier"
          value={item.supplier}
          onChange={(e) => setItem({ ...item, supplier: e.target.value })}
          required
        />
        <Select value={item.status} onValueChange={(value) => setItem({ ...item, status: value as SupplyChainItem['status'] })}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ordered">Ordered</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="Quality Check">Quality Check</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          placeholder="Expected Delivery Date"
          value={item.expectedDeliveryDate.split('T')[0]}
          onChange={(e) => setItem({ ...item, expectedDeliveryDate: e.target.value })}
          required
        />
        <Input
          type="date"
          placeholder="Actual Delivery Date"
          value={item.actualDeliveryDate ? item.actualDeliveryDate.split('T')[0] : ''}
          onChange={(e) => setItem({ ...item, actualDeliveryDate: e.target.value })}
        />
        <Button type="submit">Update Item</Button>
      </form>
    </div>
  )
}

