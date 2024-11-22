"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Package, DollarSign, Edit, Trash2, Calendar, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/orders"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(
          `https://backend-service-9xuv.onrender.com/api/orders/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        setError("Failed to delete order. Please try again.");
      }
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleUpdate = async () => {
    if (!editingOrder) return;

    try {
      const response = await fetch(
        `https://backend-service-9xuv.onrender.com/api/orders/${editingOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingOrder),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingOrder(null);
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Failed to update order. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewOrder({});
      await fetchOrders();
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please try again.");
    }
  };

  const renderOrders = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      return (
        <Alert variant="default" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Orders</AlertTitle>
          <AlertDescription>There are no orders to display.</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <CardContent className="p-4 space-y-2">
                {editingOrder && editingOrder._id === order._id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingOrder.orderNumber}
                      onChange={(e) => setEditingOrder({ ...editingOrder, orderNumber: e.target.value })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      value={editingOrder.customerName}
                      onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      type="date"
                      value={editingOrder.orderDate}
                      onChange={(e) => setEditingOrder({ ...editingOrder, orderDate: e.target.value })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      type="number"
                      value={editingOrder.totalAmount}
                      onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: parseFloat(e.target.value) })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Select
                      value={editingOrder.status}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, status: value as Order['status'] })}
                    >
                      <SelectTrigger style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleUpdate} style={{ backgroundColor: colors.accent, color: colors.background }}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3
                      className="font-bold text-lg flex items-center"
                      style={{ color: colors.accent }}
                    >
                      <Package size={20} className="mr-2" />
                      Order #{order.orderNumber}
                    </h3>
                    <p
                      className="text-sm flex items-center"
                      style={{ color: colors.text }}
                    >
                      <User size={16} className="mr-2" style={{ color: colors.accent }} />
                      {order.customerName}
                    </p>
                    <p
                      className="text-sm flex items-center"
                      style={{ color: colors.text }}
                    >
                      <Calendar size={16} className="mr-2" style={{ color: colors.accent }} />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p
                      className="text-lg font-semibold flex items-center"
                      style={{ color: colors.text }}
                    >
                      <DollarSign size={16} className="mr-1" style={{ color: colors.accent }} />
                      {typeof order.totalAmount === 'number' ? order.totalAmount.toFixed(2) : 'N/A'}
                    </p>
                    <p
                      className="text-sm flex items-center"
                      style={{ color: colors.text }}
                    >
                      Status: {order.status}
                    </p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        onClick={() => handleEdit(order)}
                        className="text-white"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(order._id)}
                        className="text-white"
                        style={{ backgroundColor: "#e11d48" }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen p-4 space-y-8"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: colors.accent }}
      >
        Order Management
      </h1>

      <Card className="mb-8" style={{ backgroundColor: colors.background }}>
        <CardHeader>
          <CardTitle style={{ color: colors.accent }}>Add New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Order Number"
              value={newOrder.orderNumber || ""}
              onChange={(e) => setNewOrder({ ...newOrder, orderNumber: e.target.value })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              placeholder="Customer Name"
              value={newOrder.customerName || ""}
              onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              type="date"
              value={newOrder.orderDate || ""}
              onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              type="number"
              placeholder="Total Amount"
              value={newOrder.totalAmount || ""}
              onChange={(e) => setNewOrder({ ...newOrder, totalAmount: parseFloat(e.target.value) })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Select
              onValueChange={(value) => setNewOrder({ ...newOrder, status: value as Order['status'] })}
            >
              <SelectTrigger style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreate} style={{ backgroundColor: colors.accent, color: colors.background }}>
              Add Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: colors.accent }}
          ></div>
          <p className="mt-4" style={{ color: colors.text }}>
            Loading orders...
          </p>
        </div>
      ) : (
        renderOrders()
      )}
    </div>
  );
}

