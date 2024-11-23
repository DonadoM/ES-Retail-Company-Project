"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-hot-toast";

interface SupplyChainItem {
  _id: string;
  itemName: string;
  sku: string;
  quantity: number;
  supplier: string;
  status: "Ordered" | "In Transit" | "Received" | "Quality Check" | "In Stock";
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
}

export default function SupplyChainPage() {
  const [items, setItems] = useState<SupplyChainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/supply-chain`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supply chain items");
      }
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch supply chain items");
      setLoading(false);
      toast.error("Failed to fetch supply chain items");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/supply-chain/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete supply chain item");
      }
      setItems(items.filter((item) => item._id !== id));
      toast.success("Supply chain item deleted successfully");
    } catch {
      toast.error("Failed to delete supply chain item");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-5 text-center text-blue-600">
        Supply Chain Management
      </h1>
      <Button
        onClick={() => router.push("/admin/supply-chain/add")}
        className="mb-5 bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
      >
        Add New Item
      </Button>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Actual Delivery</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Date(item.expectedDeliveryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {item.actualDeliveryDate
                    ? new Date(item.actualDeliveryDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push(`/admin/supply-chain/edit/${item._id}`)
                    }
                    className="mr-2 bg-green-600 text-white hover:bg-green-700 transition duration-200"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="destructive"
                    className="bg-red-600 text-white hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </Button>
                </TableCell>
 </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}