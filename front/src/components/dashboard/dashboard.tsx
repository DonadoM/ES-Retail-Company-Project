'use client'

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Table } from "./Table"
import { AddEditModal } from "./AddEditModal"
import { DeleteModal } from "./DeleteModal"
import { StoreButton } from "./StoreButton"
import { serviceMap, TabType, Item, ProductItem, CustomerItem, OrderItem, SupplyChainItem, PromotionItem } from "./types"
import {
  ProductForm,
  CustomerForm,
  OrderForm,
  SupplyChainForm,
  PromotionForm,
} from "../forms/form"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Products")
  const [data, setData] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Item>({} as Item)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const router = useRouter()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedData = await serviceMap[activeTab].get()
      setData(fetchedData)
    } catch (error) {
      setError(
        `Error al obtener datos de ${activeTab}: ${(error as Error).message}`
      )
    } finally {
      setIsLoading(false)
    }
  }, [activeTab])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    switch (activeTab) {
      case "Products":
        const productData = formData as ProductItem
        if (!productData.name) errors.name = "El nombre es requerido"
        if (!productData.price || productData.price <= 0)
          errors.price = "El precio debe ser mayor a 0"
        if (!productData.category) errors.category = "La categoría es requerida"
        if (!productData.description)
          errors.description = "La descripción es requerida"
        if (productData.stock < 0)
          errors.stock = "El stock no puede ser negativo"
        break
      case "Customers":
        const customerData = formData as CustomerItem
        if (!customerData.name) errors.name = "El nombre es requerido"
        if (!customerData.email)
          errors.email = "El correo electrónico es requerido"
        if (!customerData.phone) errors.phone = "El teléfono es requerido"
        break
      case "Orders":
        const orderData = formData as OrderItem
        if (!orderData.customerName)
          errors.customerName = "El nombre del cliente es requerido"
        if (!orderData.quantity || orderData.quantity <= 0)
          errors.quantity = "La cantidad debe ser mayor a 0"
        if (!orderData.totalPrice || orderData.totalPrice <= 0)
          errors.totalPrice = "El monto total debe ser mayor a 0"
        break
      case "Supply Chain":
        const supplyChainData = formData as SupplyChainItem
        if (!supplyChainData.productId)
          errors.productId = "El ID del producto es requerido"
        if (!supplyChainData.supplier) errors.supplier = "El proveedor es requerido"
        if (!supplyChainData.quantity || supplyChainData.quantity <= 0)
          errors.quantity = "La cantidad debe ser mayor a 0"
        break
      case "Promotions":
        const promotionData = formData as PromotionItem
        if (!promotionData.title) errors.title = "El título es requerido"
        if (!promotionData.discount || promotionData.discount <= 0)
          errors.discount = "El descuento debe ser mayor a 0"
        if (!promotionData.startDate)
          errors.startDate = "La fecha de inicio es requerida"
        if (!promotionData.endDate)
          errors.endDate = "La fecha de finalización es requerida"
        break
      default:
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAction = async (
    action: "add" | "update" | "delete",
    item?: Item
  ) => {
    if (action !== "delete" && !validateForm()) return

    const service = serviceMap[activeTab]

    try {
      let result: Item
      switch (action) {
        case "add":
          if (service.create) {
            result = await service.create(formData)
            setData([...data, result])
          }
          break
        case "update":
          if (service.update) {
            result = await service.update(formData.id, formData)
            setData(data.map((d) => (d.id === result.id ? result : d)))
          }
          break
        case "delete":
          if (service.delete) {
            if (!deleteId) {
              throw new Error("ID de eliminación no proporcionado")
            }
            await service.delete(deleteId)
            setData(data.filter((d) => d.id !== deleteId))
            setDeleteId("")
          }
          break
        default:
          break
      }
      setFormData({} as Item)
      setFormErrors({})
      setIsEditing(false)
      setShowModal(false)
      setShowDeleteModal(false)
      fetchData()
    } catch (error) {
      console.error(
        `Error ${
          action === "add"
            ? "agregando"
            : action === "update"
            ? "actualizando"
            : "eliminando"
        } ${activeTab}:`,
        error
      )
      setError(
        `Error ${
          action === "add"
            ? "agregando"
            : action === "update"
            ? "actualizando"
            : "eliminando"
        } ${activeTab}: ${(error as Error).message}`
      )
    }
  }

  const renderForm = (): React.ReactNode => {
    switch (activeTab) {
      case "Products":
        return (
          <ProductForm
            formData={formData as ProductItem}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<ProductItem>>}
            formErrors={formErrors}
          />
        )
      case "Customers":
        return (
          <CustomerForm
            formData={formData as CustomerItem}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<CustomerItem>>}
            formErrors={formErrors}
          />
        )
      case "Orders":
        return (
          <OrderForm
            formData={formData as OrderItem}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<OrderItem>>}
            formErrors={formErrors}
          />
        )
      case "Supply Chain":
        return (
          <SupplyChainForm
            formData={formData as SupplyChainItem}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<SupplyChainItem>>}
            formErrors={formErrors}
          />
        )
      case "Promotions":
        return (
          <PromotionForm
            formData={formData as PromotionItem}
            setFormData={setFormData as React.Dispatch<React.SetStateAction<PromotionItem>>}
            formErrors={formErrors}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-[#222831] text-[#EEEEEE]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTab={activeTab}
          setShowModal={setShowModal}
          setShowDeleteModal={setShowDeleteModal}
        />
        <div className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-full"
              >
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#76ABAE]"></div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500"
              >
                {error}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                
                <Table
                  data={data}
                  setFormData={setFormData}
                  setFormErrors={setFormErrors}
                  setIsEditing={setIsEditing}
                  setShowModal={setShowModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteId={setDeleteId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <AddEditModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEditing={isEditing}
        activeTab={activeTab}
        renderForm={renderForm}
        handleAction={handleAction}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        activeTab={activeTab}
        handleAction={handleAction}
      />
      <StoreButton />
    </div>
  )
}