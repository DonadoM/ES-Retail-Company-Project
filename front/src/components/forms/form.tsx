import React from "react";
import { motion } from "framer-motion";
import {
  ProductItem,
  CustomerItem,
  OrderItem,
  SupplyChainItem,
  PromotionItem,
} from "../dashboard/types";

interface FormProps<T> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  formErrors: Partial<Record<keyof T, string>>;
}

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string | number | Date | string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  options?: { value: string; label: string }[];
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  options,
}) => {
  const formatDateValue = (val: string | number | Date | string[]): string => {
    if (val instanceof Date) {
      return val.toISOString().split("T")[0];
    }
    if (typeof val === "string") {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    }
    return String(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#EEEEEE] mb-1"
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          value={String(value)}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-lg bg-[#222831] border ${
            error ? "border-red-500" : "border-[#76ABAE]/30"
          } text-[#EEEEEE] focus:outline-none focus:border-[#76ABAE] transition-colors`}
        >
          <option value="">Selecciona una opción</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={type === "date" ? formatDateValue(value) : String(value)}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-lg bg-[#222831] border ${
            error ? "border-red-500" : "border-[#76ABAE]/30"
          } text-[#EEEEEE] focus:outline-none focus:border-[#76ABAE] transition-colors`}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export const ProductForm: React.FC<FormProps<ProductItem>> = ({
  formData,
  setFormData,
  formErrors,
}) => (
  <>
    <FormInput
      id="name"
      label="Nombre"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      error={formErrors.name}
    />
    <FormInput
      id="price"
      label="Precio"
      type="number"
      value={formData.price}
      onChange={(e) =>
        setFormData({ ...formData, price: parseFloat(e.target.value) })
      }
      error={formErrors.price}
    />
    <FormInput
      id="category"
      label="Categoría"
      type="text"
      value={formData.category}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      error={formErrors.category}
    />
    <FormInput
      id="description"
      label="Descripción"
      type="text"
      value={formData.description}
      onChange={(e) =>
        setFormData({ ...formData, description: e.target.value })
      }
      error={formErrors.description}
    />
    <FormInput
      id="stock"
      label="Stock"
      type="number"
      value={formData.stock}
      onChange={(e) =>
        setFormData({ ...formData, stock: parseInt(e.target.value, 10) })
      }
      error={formErrors.stock}
    />
  </>
);

export const CustomerForm: React.FC<FormProps<CustomerItem>> = ({
  formData,
  setFormData,
  formErrors,
}) => (
  <>
    <FormInput
      id="name"
      label="Nombre"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      error={formErrors.name}
    />
    <FormInput
      id="email"
      label="Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      error={formErrors.email}
    />
    <FormInput
      id="address"
      label="Dirección"
      type="text"
      value={formData.address}
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      error={formErrors.address}
    />
    <FormInput
      id="phone"
      label="Teléfono"
      type="tel"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      error={formErrors.phone}
    />
  </>
);

export const OrderForm: React.FC<FormProps<OrderItem>> = ({
  formData,
  setFormData,
  formErrors,
}) => (
  <>
    <FormInput
      id="customerName"
      label="Nombre del Cliente"
      type="text"
      value={formData.customerName}
      onChange={(e) =>
        setFormData({ ...formData, customerName: e.target.value })
      }
      error={formErrors.customerName}
    />
    <FormInput
      id="totalPrice"
      label="Monto Total"
      type="number"
      value={formData.totalPrice}
      onChange={(e) =>
        setFormData({ ...formData, totalPrice: parseFloat(e.target.value) })
      }
      error={formErrors.totalPrice}
    />
    <FormInput
      id="status"
      label="Estado"
      type="select"
      value={formData.status}
      onChange={(e) =>
        setFormData({
          ...formData,
          status: e.target.value as "pending" | "completed" | "canceled",
        })
      }
      error={formErrors.status}
      options={[
        { value: "pending", label: "Pendiente" },
        { value: "completed", label: "Completado" },
        { value: "canceled", label: "Cancelado" },
      ]}
    />
  </>
);

export const SupplyChainForm: React.FC<FormProps<SupplyChainItem>> = ({
  formData,
  setFormData,
  formErrors,
}) => (
  <>
    <FormInput
      id="productId"
      label="ID del Producto"
      type="text"
      value={formData.productId}
      onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
      error={formErrors.productId}
    />
    <FormInput
      id="quantity"
      label="Cantidad"
      type="number"
      value={formData.quantity}
      onChange={(e) =>
        setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })
      }
      error={formErrors.quantity}
    />
    <FormInput
      id="supplier"
      label="Proveedor"
      type="text"
      value={formData.supplier}
      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
      error={formErrors.supplier}
    />
    <FormInput
      id="expectedDeliveryDate"
      label="Fecha Esperada de Entrega"
      type="date"
      value={formData.expectedDeliveryDate}
      onChange={(e) =>
        setFormData({ ...formData, expectedDeliveryDate: e.target.value })
      }
      error={formErrors.expectedDeliveryDate}
    />
  </>
);
export const PromotionForm: React.FC<FormProps<PromotionItem>> = ({
  formData,
  setFormData,
  formErrors,
}) => (
  <>
    <FormInput
      id="title"
      label="Título de la Promoción"
      type="text"
      value={formData.title || ""}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      error={formErrors.title}
    />
    <FormInput
      id="discount"
      label="Descuento (%)"
      type="number"
      value={formData.discount || 0}
      onChange={(e) =>
        setFormData({ ...formData, discount: parseFloat(e.target.value) })
      }
      error={formErrors.discount}
    />
    <FormInput
      id="startDate"
      label="Fecha de Inicio"
      type="date"
      value={
        formData.startDate instanceof Date
          ? formData.startDate.toISOString().split("T")[0]
          : ""
      }
      onChange={(e) =>
        setFormData({ ...formData, startDate: new Date(e.target.value) })
      }
      error={formErrors.startDate}
    />
    <FormInput
      id="endDate"
      label="Fecha de Fin"
      type="date"
      value={
        formData.endDate instanceof Date
          ? formData.endDate.toISOString().split("T")[0]
          : ""
      }
      onChange={(e) =>
        setFormData({ ...formData, endDate: new Date(e.target.value) })
      }
      error={formErrors.endDate}
    />
    <FormInput
      id="channels"
      label="Canales Aplicables"
      type="text"
      value={
        Array.isArray(formData.channels) ? formData.channels.join(", ") : ""
      }
      onChange={(e) =>
        setFormData({
          ...formData,
          channels: e.target.value.split(", ").filter(Boolean),
        })
      }
      error={formErrors.channels}
    />
  </>
);
