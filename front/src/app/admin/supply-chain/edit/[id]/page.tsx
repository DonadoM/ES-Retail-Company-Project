'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

interface SupplyChainItem {
  _id: string
  name: string
  description: string
  category: string
  quantity: number
  location: string
}

export default function EditSupplyChainPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [item, setItem] = useState<SupplyChainItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchItem(id)
    }
  }, [id])

  const fetchItem = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supply-chain/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch supply chain item')
      }
      const data = await response.json()
      setItem(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching supply chain item:', error)
      setError('Failed to fetch supply chain item')
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!item) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supply-chain/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        toast.success('Supply chain item updated successfully')
        router.push('/admin/supply-chain')
      } else {
        console.error('Error saving supply chain item:', response.statusText)
        toast.error('Error saving supply chain item')
      }
    } catch (error) {
      console.error('Error saving supply chain item:', error)
      toast.error('Error saving supply chain item')
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
      <h1>Edit Supply Chain Item</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Input
          placeholder="Name"
          value={item?.name || ''}
          onChange={(e) => setItem(item ? { ...item, name: e.target.value } : null)}
          required
        />
        <Input
          placeholder="Description"
          value={item?.description || ''}
          onChange={(e) => setItem(item ? { ...item, description: e.target.value } : null)}
          required
        />
        <Input
          placeholder="Category"
          value={item?.category || ''}
          onChange={(e) => setItem(item ? { ...item, category: e.target.value } : null)}
          required
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={item?.quantity || 0}
          onChange={(e) => setItem(item ? { ...item, quantity: parseInt(e.target.value) } : null)}
          required
        />
        <Input
          placeholder="Location"
          value={item?.location || ''}
          onChange={(e) => setItem(item ? { ...item, location: e.target.value } : null)}
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}