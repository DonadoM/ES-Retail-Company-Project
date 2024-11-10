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
  quantity: number
  customerName: string
  totalPrice: number
  status: "pending" | "completed" | "canceled"
  createdAt: Date
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

export interface ServiceMapType {
  [key: string]: {
    get: () => Promise<Item[]>
    create?: (data: Item) => Promise<Item>
    update?: (id: string, data: Item) => Promise<Item>
    delete?: (id: string) => Promise<void>
  }
}

export const serviceMap: ServiceMapType = {
  Products: {
    get: getProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },
  Customers: {
    get: getCustomers,
    create: createCustomer,
    update: updateCustomer,
    delete: deleteCustomer,
  },
  Orders: {
    get: getOrders,
    create: createOrder,
    update: updateOrder,
    delete: deleteOrder,
  },
  "Supply Chain": {
    get: getSupplyChain,
    create: createSupplyChainItem,
    update: updateSupplyChainItem,
    delete: deleteSupplyChainItem,
  },
  Promotions: {
    get: getPromotions,
    create: createPromotion,
    update: updatePromotion,
    delete: deletePromotion,
  },
}