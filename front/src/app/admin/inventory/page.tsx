"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Package, DollarSign, Edit, Trash2 } from 'lucide-react';

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

interface InventoryItem {
  _id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
}

export default function AdminInventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({});

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/inventory"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setInventoryItems(data);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      setError("Failed to load inventory items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      try {
        const response = await fetch(
          `https://backend-service-9xuv.onrender.com/api/inventory/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchInventoryItems();
      } catch (error) {
        console.error("Error deleting inventory item:", error);
        setError("Failed to delete inventory item. Please try again.");
      }
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch(
        `https://backend-service-9xuv.onrender.com/api/inventory/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingItem(null);
      await fetchInventoryItems();
    } catch (error) {
      console.error("Error updating inventory item:", error);
      setError("Failed to update inventory item. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewItem({});
      await fetchInventoryItems();
    } catch (error) {
      console.error("Error creating inventory item:", error);
      setError("Failed to create inventory item. Please try again.");
    }
  };

  const renderInventoryItems = () => {
    if (!Array.isArray(inventoryItems) || inventoryItems.length === 0) {
      return (
        <Alert variant="default" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Items</AlertTitle>
          <AlertDescription>There are no inventory items to display.</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <CardContent className="p-4 space-y-2">
                {editingItem && editingItem._id === item._id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingItem.productName}
                      onChange={(e) => setEditingItem({ ...editingItem, productName: e.target.value })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      value={editingItem.sku}
                      onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      type="number"
                      value={editingItem.quantity}
                      onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
                    <Input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
                    />
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
                      {item.productName}
                    </h3>
                    <p
                      className="text-sm flex items-center"
                      style={{ color: colors.text }}
                    >
                      SKU: {item.sku}
                    </p>
                    <p
                      className="text-sm flex items-center"
                      style={{ color: colors.text }}
                    >
                      Quantity: {item.quantity}
                    </p>
                    <p
                      className="text-lg font-semibold flex items-center"
                      style={{ color: colors.text }}
                    >
                      <DollarSign size={16} className="mr-1" style={{ color: colors.accent }} />
                      {item.price.toFixed(2)}
                    </p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        onClick={() => handleEdit(item)}
                        className="text-white"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
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
        Inventory Management
      </h1>

      <Card className="mb-8" style={{ backgroundColor: colors.background }}>
        <CardHeader>
          <CardTitle style={{ color: colors.accent }}>Add New Inventory Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Product Name"
              value={newItem.productName || ""}
              onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              placeholder="SKU"
              value={newItem.sku || ""}
              onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity || ""}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newItem.price || ""}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: colors.text }}
            />
            <Button onClick={handleCreate} style={{ backgroundColor: colors.accent, color: colors.background }}>
              Add Item
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
            Loading inventory items...
          </p>
        </div>
      ) : (
        renderInventoryItems()
      )}
    </div>
  );
}

