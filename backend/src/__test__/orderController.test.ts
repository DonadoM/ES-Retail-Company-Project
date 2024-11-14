import request from "supertest";
import express, { Express } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import { IOrder, Order } from "../models/orderModel";

jest.mock("../models/orderModel");

const setupApp: () => Express = (): Express => {
  const app: Express = express();
  app.use(express.json());
  app.post("/api/orders", createOrder);
  app.get("/api/orders", getOrders);
  app.get("/api/orders/:id", getOrderById);
  app.put("/api/orders/:id", updateOrder);
  app.delete("/api/orders/:id", deleteOrder);
  return app;
};

const app = setupApp();

const mockOrderData = {
  _id: "newId",
  orderId: "ORD12345",
  customerName: "John Doe",
  items: [{ productId: "P123", quantity: 2 }],
  totalPrice: 150,
  status: "pending",
  createdAt: new Date().toISOString(),
};

const mockReject = (fn: jest.Mock, errorMsg = "Database error") => {
  fn.mockRejectedValue(new Error(errorMsg));
};

describe("Order Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createOrder", () => {
    it("should create a new order and return it", async () => {
      jest.spyOn(Order.prototype, "save").mockResolvedValue(mockOrderData);

      const response = await request(app)
        .post("/api/orders")
        .send({
          orderId: "ORD12345",
          customerName: "John Doe",
          items: [{ productId: "P123", quantity: 2 }],
          totalPrice: 150,
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Order created successfully",
        order: mockOrderData,
      });
    });

    it("should return a 500 error if order creation fails", async () => {
      mockReject(Order.prototype.save);

      const response = await request(app)
        .post("/api/orders")
        .send({
          orderId: "ORD67890",
          customerName: "Jane Smith",
          items: [{ productId: "P125", quantity: 3 }],
          totalPrice: 200,
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to create order",
        details: {},
      });
    });
  });

  describe("getOrders", () => {
    it("should return an array of orders", async () => {
      jest.spyOn(Order, "find").mockResolvedValue([mockOrderData as unknown as IOrder]);

      const response = await request(app).get("/api/orders");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockOrderData]);
    });

    it("should return a 500 error if retrieval fails", async () => {
      mockReject(Order.find as jest.Mock);

      const response = await request(app).get("/api/orders");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Error retrieving orders",
        details: {},
      });
    });
  });

  describe("getOrderById", () => {
    it("should return a single order by ID", async () => {
      jest.spyOn(Order, "findById").mockResolvedValue(mockOrderData as unknown as IOrder);

      const response = await request(app).get("/api/orders/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrderData);
    });

    it("should return a 404 error if order not found", async () => {
      jest.spyOn(Order, "findById").mockResolvedValue(null);

      const response = await request(app).get("/api/orders/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Order not found" });
    });

    it("should return a 500 error if retrieval fails", async () => {
      mockReject(Order.findById as jest.Mock);

      const response = await request(app).get("/api/orders/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to fetch order",
        details: {},
      });
    });
  });

  describe("updateOrder", () => {
    it("should update an order and return the updated order", async () => {
      const updatedOrder = { ...mockOrderData, totalPrice: 200 };
      jest.spyOn(Order, "findByIdAndUpdate").mockResolvedValue(updatedOrder as unknown as IOrder);

      const response = await request(app).put("/api/orders/1").send({
        totalPrice: 200,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Order updated successfully",
        order: updatedOrder,
      });
    });

    it("should return a 404 error if order not found", async () => {
      jest.spyOn(Order, "findByIdAndUpdate").mockResolvedValue(null);

      const response = await request(app).put("/api/orders/1").send({
        totalPrice: 250,
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Order not found" });
    });

    it("should return a 500 error if update fails", async () => {
      mockReject(Order.findByIdAndUpdate as jest.Mock);

      const response = await request(app).put("/api/orders/1").send({
        totalPrice: 250,
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Failed to update order",
        details: {},
      });
    });
  });

  describe("deleteOrder", () => {
    it("should delete an order and return a success message", async () => {
      jest.spyOn(Order, "findByIdAndDelete").mockResolvedValue(mockOrderData as unknown as IOrder);

      const response = await request(app).delete("/api/orders/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Order deleted successfully" });
    });

    it("should return a 404 error if order not found", async () => {
      jest.spyOn(Order, "findByIdAndDelete").mockResolvedValue(null);

      const response = await request(app).delete("/api/orders/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Order not found" });
    });

    it("should return a 500 error if deletion fails", async () => {
      mockReject(Order.findByIdAndDelete as jest.Mock);

      const response = await request(app).delete("/api/orders/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Failed to delete order",
        details: {},
      });
    });
  });
});