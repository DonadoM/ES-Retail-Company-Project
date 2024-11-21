import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService"
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../services/orderService"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService"
import {
  getSupplyChain,
  createSupplyChainItem,
  updateSupplyChainItem,
  deleteSupplyChainItem,
} from "../../services/supplyChainService"
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../services/promotionService"

export type TabType =
  | "Products"
  | "Customers"
  | "Orders"
  | "Supply Chain"
  | "Promotions"

export interface BaseItem {
  id: string
}

export interface ProductItem extends BaseItem {
  name: string
  price: number
  category: string
  description: string
  stock: number
}

export interface CustomerItem extends BaseItem {
  name: string
  email: string
  address: string
  phone: string
}

export interface OrderItem extends BaseItem {
  customerName: string
  totalPrice: number
  status: "pending" | "completed" | "canceled"

}

export interface SupplyChainItem extends BaseItem {
  productId: string
  quantity: number
  supplier: string
  expectedDeliveryDate: string
}

export interface PromotionItem extends BaseItem {
  title: string
  discount: number
  startDate: Date
  endDate: Date
  channels: string[]
}

export type Item = ProductItem | CustomerItem | OrderItem | SupplyChainItem | PromotionItem

export interface ServiceMapType<T extends Item> {
  get: () => Promise<T[]>
  create?: (data: T) => Promise<T>
  update?: (id: string, data: T) => Promise<T>
  delete?: (id: string) => Promise<void>
}

export const serviceMap: { [key in TabType]: ServiceMapType<any> } = {
  Products: {
    get: () => Promise.resolve(getProducts()),
    create: (data) => Promise.resolve(createProduct(data)),
    update: (id, data) => Promise.resolve(updateProduct(id, data)),
    delete: (id) => Promise.resolve(deleteProduct(id)),
  },
  Customers: {
    get: () => Promise.resolve(getCustomers()),
    create: (data) => Promise.resolve(createCustomer(data)),
    update: (id, data) => Promise.resolve(updateCustomer(id, data)),
    delete: (id) => Promise.resolve(deleteCustomer(id)),
  },
  Orders: {
    get: () => Promise.resolve(getOrders()),
    create: (data) => Promise.resolve(createOrder(data)),
    update: (id, data) => Promise.resolve(updateOrder(id, data)),
    delete: (id) => Promise.resolve(deleteOrder(id)),
  },
  "Supply Chain": {
    get: () => Promise.resolve(getSupplyChain()),
    create: (data) => Promise.resolve(createSupplyChainItem(data)),
    update: (id, data) => Promise.resolve(updateSupplyChainItem(id, data)),
    delete: (id) => Promise.resolve(deleteSupplyChainItem(id)),
  },
  Promotions: {
    get: () => Promise.resolve(getPromotions()),
    create: (data) => Promise.resolve(createPromotion(data)),
    update: (id, data) => Promise.resolve(updatePromotion(id, data)),
    delete: (id) => Promise.resolve(deletePromotion(id)),
  },
}