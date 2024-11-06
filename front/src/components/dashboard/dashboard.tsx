"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Search } from "lucide-react";
import {
  ProductForm,
  CustomerForm,
  OrderForm,
  SupplyChainForm,
  PromotionForm,
} from "../forms/form";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../services/orderService";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import {
  getSupplyChain,
  createSupplyChainItem,
  updateSupplyChainItem,
  deleteSupplyChainItem,
} from "../../services/supplyChainService";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../services/promotionService";

type TabType =
  | "Products"
  | "Customers"
  | "Orders"
  | "Supply Chain"
  | "Promotions";

interface ServiceMapType {
  [key: string]: {
    get: () => Promise<any[] | { data: any[] }>;
    create?: (data: any) => Promise<any>;
    update?: (id: string, data: any) => Promise<any>;
    delete?: (id: string) => Promise<void>;
  };
}

const serviceMap: ServiceMapType = {
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
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("Products");
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = useRouter();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedData = await serviceMap[activeTab].get();
      if (Array.isArray(fetchedData)) {
        setData(fetchedData);
      } else if (fetchedData.data && Array.isArray(fetchedData.data)) {
        setData(fetchedData.data);
      } else {
        setData([]);
        setError(`Formato de datos inesperado para ${activeTab}`);
      }
    } catch (error) {
      setError(
        `Error al obtener datos de ${activeTab}: ${(error as Error).message}`
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const validateForm = () => {
    const errors: any = {};

    switch (activeTab) {
      case "Products":
        if (!formData.name) errors.name = "El nombre es requerido";
        if (!formData.price || formData.price <= 0)
          errors.price = "El precio debe ser mayor a 0";
        if (!formData.category) errors.category = "La categoría es requerida";
        if (!formData.description)
          errors.description = "La descripción es requerida";
        if (formData.stock < 0) errors.stock = "El stock no puede ser negativo";
        break;
      case "Customers":
        if (!formData.name) errors.name = "El nombre es requerido";
        if (!formData.email)
          errors.email = "El correo electrónico es requerido";
        if (!formData.phone) errors.phone = "El teléfono es requerido";
        break;
      case "Orders":
        if (!formData.customerId)
          errors.customerId = "El ID del cliente es requerido";
        if (!formData.productId)
          errors.productId = "El ID del producto es requerido";
        if (!formData.quantity || formData.quantity <= 0)
          errors.quantity = "La cantidad debe ser mayor a 0";
        break;
      case "Supply Chain":
        if (!formData.itemName)
          errors.itemName = "El nombre del artículo es requerido";
        if (!formData.supplier) errors.supplier = "El proveedor es requerido";
        if (!formData.quantity || formData.quantity <= 0)
          errors.quantity = "La cantidad debe ser mayor a 0";
        break;
      case "Promotions":
        if (!formData.title) errors.title = "El título es requerido";
        if (!formData.discount || formData.discount <= 0)
          errors.discount = "El descuento debe ser mayor a 0";
        if (!formData.startDate)
          errors.startDate = "La fecha de inicio es requerida";
        if (!formData.endDate)
          errors.endDate = "La fecha de finalización es requerida";
        break;
      default:
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAction = async (
    action: "add" | "update" | "delete",
    item?: any
  ) => {
    if (action !== "delete" && !validateForm()) return;

    const service = serviceMap[activeTab];

    try {
      let result: any;
      switch (action) {
        case "add":
          if (service.create && typeof service.create === "function") {
            result = await service.create(formData);
            setData([...data, result]);
          } else {
            throw new Error(`Método create no soportado para ${activeTab}`);
          }
          break;
        case "update":
          if (service.update && typeof service.update === "function") {
            result = await service.update(formData.id, formData);
            setData(data.map((d) => (d.id === result.id ? result : d)));
          } else {
            throw new Error(`Método update no soportado para ${activeTab}`);
          }
          break;
          case "delete":
            if (service.delete && typeof service.delete === "function") {
              if (!deleteId) {
                throw new Error("ID de eliminación no proporcionado");
              }
              await service.delete(deleteId); // Llama al servicio de eliminación con deleteId
              setData(data.filter((d) => d.id !== deleteId)); // Actualiza el estado de data
              setDeleteId(""); // Limpia deleteId después de una eliminación exitosa
            } else {
              throw new Error(`Método delete no soportado para ${activeTab}`);
            }
            break;
          default:
            break;
        }
        setFormData({});
        setFormErrors({});
        setIsEditing(false);
        setShowModal(false);
        setShowDeleteModal(false);
        fetchData(); // Refresca los datos después de la acción
      } catch (error) {
        console.log(error);
        console.error(
          `Error ${
            action === "add"
              ? "agregando"
              : action === "update"
              ? "actualizando"
              : "eliminando"
          } ${activeTab}:`,
          error
        );
        setError(
          `Error ${
            action === "add"
              ? "agregando"
              : action === "update"
              ? "actualizando"
              : "eliminando"
          } ${activeTab}: ${(error as Error).message}`
        );
      }
    };
  const renderForm = (): React.ReactNode => {
    switch (activeTab) {
      case "Products":
        return (
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case "Customers":
        return (
          <CustomerForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case "Orders":
        return (
          <OrderForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case "Supply Chain":
        return (
          <SupplyChainForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case "Promotions":
        return (
          <PromotionForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      default:
        return null;
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-[#222831] text-[#EEEEEE] overflow-hidden">
      <motion.div
        className="fixed inset-0 bg-[#76ABAE] opacity-10 pointer-events-none"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 20%, #76ABAE 1px, transparent 1px)",
            "radial-gradient(circle at 80% 80%, #76ABAE 1px, transparent 1px)",
          ],
          backgroundSize: ["20px 20px", "30px 30px"],
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-[#31363F] p-6 flex flex-col shadow-xl z-20"
          >
            <h1 className="text-2xl font-bold mb-8">Vogue Verse Dashboard</h1>
            <nav className="space-y-2 flex-1">
              {Object.keys(serviceMap).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab
                      ? "bg-[#76ABAE] text-[#222831]"
                      : "text-[#EEEEEE] hover:bg-[#76ABAE]/20"
                  }`}
                  onClick={() => setActiveTab(tab as TabType)}
                >
                  {tab}
                </motion.button>
              ))}
            </nav>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/logout")}
              className="mt-auto p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#31363F] p-4 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#EEEEEE] p-2 rounded-lg hover:bg-[#76ABAE]/20"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
          <h2 className="text-xl font-semibold">{activeTab}</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder={`Buscar en ${activeTab.toLowerCase()}`}
                className="pl-10 pr-3 py-2 rounded-lg bg-[#222831] border border-[#76ABAE]/30 text-[#EEEEEE] placeholder-[#EEEEEE]/50 focus:outline-none focus:border-[#76ABAE]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EEEEEE]/50"
                size={18}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormData({});
                setFormErrors({});
                setIsEditing(false);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-lg hover:bg-[#76ABAE]/80"
            >
              Add {activeTab}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete {activeTab}
            </motion.button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#222831] p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#76ABAE] border-t-transparent rounded-full"
              />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#31363F] rounded-xl overflow-hidden shadow-xl"
            >
              <table className="min-w-full divide-y divide-[#76ABAE]/20">
                <thead className="bg-[#222831]">
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-[#EEEEEE]/70 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#EEEEEE]/70 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#31363F] divide-y divide-[#76ABAE]/20">
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-[#222831] transition-colors"
                    >
                      {Object.entries(item).map(([key, value]) => (
                        <td
                          key={key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-[#EEEEEE]/80"
                        >
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setFormData(item);
                            setFormErrors({});
                            setIsEditing(true);
                            setShowModal(true);
                          }}
                          className="text-[#76ABAE] hover:text-[#76ABAE]/80 mr-2"
                        >
                          Update
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#31363F] p-6 rounded-xl w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">
                {isEditing ? `Update ${activeTab}` : `Add ${activeTab}`}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAction(isEditing ? "update" : "add");
                }}
              >
                {renderForm()}
                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-[#76ABAE]/30 rounded-lg hover:bg-[#222831]"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-lg hover:bg-[#76ABAE]/80"
                  >
                    {isEditing ? "Update" : "Add"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#31363F] p-6 rounded-xl w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">Delete {activeTab}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAction("delete");
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="deleteId"
                    className="block text-sm font-medium text-[#EEEEEE] mb-1"
                  >
                    ID to Delete
                  </label>
                  <input
                    type="text"
                    id="deleteId"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#222831] border border-[#76ABAE]/30 text-[#EEEEEE] focus:outline-none focus:border-[#76ABAE]"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-[#76ABAE]/30 rounded-lg hover:bg-[#222831]"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/dashboard/store")}
        className="fixed bottom-4 right-4 bg-[#76ABAE] text-[#222831] p-4 rounded-full shadow-lg hover:bg-[#76ABAE]/80 flex items-center justify-center"
      >
        <span className="mr-2">Visitar Tienda</span>
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
