"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

interface Customer {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/customers"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `https://backend-service-9xuv.onrender.com/api/customers/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
        setError("Failed to delete customer. Please try again.");
      }
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdate = async () => {
    if (!editingCustomer) return;

    try {
      const response = await fetch(
        `https://backend-service-9xuv.onrender.com/api/customers/${editingCustomer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingCustomer),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingCustomer(null);
      await fetchCustomers();
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Failed to update customer. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        "https://backend-service-9xuv.onrender.com/api/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewCustomer({});
      await fetchCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Failed to create customer. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="p-4" style={{ backgroundColor: colors.background }}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 space-y-8"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: colors.accent }}
      >
        Customer Management
      </h1>

      <Card className="mb-8" style={{ backgroundColor: colors.background }}>
        <CardHeader>
          <CardTitle style={{ color: colors.accent }}>
            Add New Customer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={newCustomer.name || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: colors.text,
              }}
            />
            <Input
              placeholder="Email"
              value={newCustomer.email || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: colors.text,
              }}
            />
            <Input
              placeholder="Address"
              value={newCustomer.address || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: colors.text,
              }}
            />
            <Input
              placeholder="Phone"
              value={newCustomer.phone || ""}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: colors.text,
              }}
            />
            <Button
              onClick={handleCreate}
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
            >
              Add Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-10">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: colors.accent }}
          ></div>
          <p className="mt-4" style={{ color: colors.text }}>
            Loading customers...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <motion.div
              key={customer._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <CardContent className="p-4 space-y-2">
                  {editingCustomer && editingCustomer._id === customer._id ? (
                    <div className="space-y-2">
                      <Input
                        value={editingCustomer.name}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            name: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: colors.text,
                        }}
                      />
                      <Input
                        value={editingCustomer.email}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            email: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: colors.text,
                        }}
                      />
                      <Input
                        value={editingCustomer.address || ""}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            address: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: colors.text,
                        }}
                      />
                      <Input
                        value={editingCustomer.phone || ""}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            phone: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: colors.text,
                        }}
                      />
                      <Button
                        onClick={handleUpdate}
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.background,
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3
                        className="font-bold text-lg flex items-center"
                        style={{ color: colors.accent }}
                      >
                        <User size={20} className="mr-2" />
                        {customer.name}
                      </h3>
                      <p
                        className="text-sm flex items-center"
                        style={{ color: colors.text }}
                      >
                        <Mail
                          size={16}
                          className="mr-2"
                          style={{ color: colors.accent }}
                        />
                        {customer.email}
                      </p>
                      {customer.phone && (
                        <p
                          className="text-sm flex items-center"
                          style={{ color: colors.text }}
                        >
                          <Phone
                            size={16}
                            className="mr-2"
                            style={{ color: colors.accent }}
                          />
                          {customer.phone}
                        </p>
                      )}
                      {customer.address && (
                        <p
                          className="text-sm flex items-center"
                          style={{ color: colors.text }}
                        >
                          <MapPin
                            size={16}
                            className="mr-2"
                            style={{ color: colors.accent }}
                          />
                          {customer.address}
                        </p>
                      )}
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEdit(customer)}
                          className="text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(customer._id)}
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
      )}
    </div>
  );
}
