// backend/src/controllers/__tests__/supplyChainController.test.ts

import request from "supertest";
import express, { Express } from "express";
import {
  getSupplyChains,
  addSupplyChain,
  deleteSupplyChain,
  updateSupplyChain,
} from "../controllers/supplyChainController";
import SupplyChain from "../models/supplyChainModel";

// Mock the SupplyChain model
jest.mock("../models/supplyChainModel");

const app: Express = express();
app.use(express.json());
app.get("/api/supplyChains", getSupplyChains);
app.post("/api/supplyChains", addSupplyChain);
app.delete("/api/supplyChains/:id", deleteSupplyChain);
app.put("/api/supplyChains/:id", updateSupplyChain);

describe("SupplyChain Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSupplyChains", () => {
    it("should return an array of supply chains", async () => {
      const mockData = [
        {
          productId: "1",
          quantity: 100,
          supplier: "Supplier A",
          deliveryDate: "2023-10-01",
        },
        {
          productId: "2",
          quantity: 200,
          supplier: "Supplier B",
          deliveryDate: "2023-11-15",
        },
      ];
      (SupplyChain.find as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get("/api/supplyChains");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it("should return a 500 error if retrieval fails", async () => {
      (SupplyChain.find as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/supplyChains");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error retrieving supply chains",
      });
    });
  });

  describe("addSupplyChain", () => {
    it("should add a new supply chain and return it", async () => {
      const mockData = {
        productId: "3",
        quantity: 300,
        supplier: "Supplier C",
        deliveryDate: "2023-12-01",
        _id: "newId",
      };
      (SupplyChain.prototype.save as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).post("/api/supplyChains").send({
        productId: "3",
        quantity: 300,
        supplier: "Supplier C",
        deliveryDate: "2023-12-01",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockData);
    });

    it("should return a 400 error if adding fails", async () => {
      (SupplyChain.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).post("/api/supplyChains").send({
        productId: "4",
        quantity: 400,
        supplier: "Supplier D",
        deliveryDate: "2024-01-10",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error adding supply chain" });
    });
  });

  describe("deleteSupplyChain", () => {
    it("should delete a supply chain and return a success message", async () => {
      (SupplyChain.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const response = await request(app).delete("/api/supplyChains/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Supply chain deleted" });
    });

    it("should return a 400 error if deletion fails", async () => {
      (SupplyChain.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/api/supplyChains/1");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error deleting supply chain" });
    });
  });

  describe("updateSupplyChain", () => {
    it("should update a supply chain and return a success message", async () => {
      (SupplyChain.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      const response = await request(app).put("/api/supplyChains/1").send({
        productId: "1",
        quantity: 500,
        supplier: "Supplier E",
        deliveryDate: "2024-02-15",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Supply chain updated" });
    });

    it("should return a 400 error if update fails", async () => {
      (SupplyChain.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).put("/api/supplyChains/1").send({
        productId: "2",
        quantity: 600,
        supplier: "Supplier F",
        deliveryDate: "2024-03-01",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error updating supply chain" });
    });
  });
});
