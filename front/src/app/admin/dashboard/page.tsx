'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }
        const data = await response.json()
        setIsAdmin(data.isAdmin)
        if (!data.isAdmin) {
          router.push('/')
          toast.error('You do not have permission to access this page')
        }
      } catch (err) {
        router.push('/login')
        toast.error('Please log in to access this page')
      }
    }

    checkAdminStatus()
  }, [router])

  const getCookie = (name: string) => document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')

  if (!isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <Button onClick={() => router.push('/admin/products')}>Manage Products</Button>
      <Button onClick={() => router.push('/admin/orders')}>Manage Orders</Button>
      <Button onClick={() => router.push('/admin/supply-chain')}>Manage Supply Chain</Button>
      <Button onClick={() => router.push('/admin/promotions')}>Manage Promotions</Button>
      <Button onClick={() => router.push('/admin/users')}>Manage Users</Button>
    </div>
  )
}

