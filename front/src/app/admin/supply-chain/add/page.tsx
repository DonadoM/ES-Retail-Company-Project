"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export default function AddSupplyChainItemPage() {
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("Ordered");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supply-chain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName,
          sku,
          quantity: Number(quantity),
          supplier,
          status,
          expectedDeliveryDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add supply chain item");
      }
      toast.success("Supply chain item added successfully");
      router.push("/admin/supply-chain");
    } catch {
      toast.error("Failed to add supply chain item");
    }
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Supply Chain Item</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <Input
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <Input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <Input
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <Select value={status} onValueChange={setStatus} className="w-full">
          <SelectTrigger className="border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ordered">Ordered</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="Quality Check">Quality Check</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          placeholder="Expected Delivery Date"
          value={expectedDeliveryDate}
          onChange={(e) => setExpectedDeliveryDate(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
          Add Item
        </Button>
      </form>
    </div>
  );
}