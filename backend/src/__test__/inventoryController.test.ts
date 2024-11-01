import { Request, Response } from "express";
import { createInventory, getInventory, updateInventory, deleteInventory } from "../controllers/inventoryController";
import Inventory from "../models/inventoryModel";

jest.mock("../models/inventoryModel"); // Mock the Inventory model

describe("Inventory Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe("createInventory", () => {
    it("should create a new inventory item and return 201 status", async () => {
      req.body = { productId: "123", quantity: 10, location: "Warehouse A" };
      const savedItem = { productId: "123", quantity: 10, location: "Warehouse A" };

      // Mock the save method on the Inventory prototype
      jest.spyOn(Inventory.prototype, "save").mockResolvedValue(savedItem);

      await createInventory(req as Request, res as Response);

      expect(Inventory).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Inventory item created successfully.",
        data: savedItem, // Ensure the savedItem is returned here
      });
    });

    it("should return 400 status if productId or quantity is missing", async () => {
      req.body = { location: "Warehouse A" };

      await createInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Product ID and quantity are required." });
    });

    it("should return 500 status on error", async () => {
      req.body = { productId: "123", quantity: 10, location: "Warehouse A" };
      jest.spyOn(Inventory.prototype, "save").mockRejectedValue(new Error("Failed to create item"));

      await createInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error creating inventory item.",
        error: "Failed to create item",
      });
    });
  });

  describe("getInventory", () => {
    it("should return all inventory items with 200 status", async () => {
      const inventoryItems = [{ productId: "123", quantity: 10, location: "Warehouse A" }];
      jest.spyOn(Inventory, "find").mockResolvedValue(inventoryItems as any);

      await getInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Inventory items retrieved successfully.",
        data: inventoryItems,
      });
    });

    it("should return 500 status on error", async () => {
      jest.spyOn(Inventory, "find").mockRejectedValue(new Error("Failed to fetch items"));

      await getInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error retrieving inventory items.",
        error: "Failed to fetch items",
      });
    });
  });

  describe("updateInventory", () => {
    it("should update an inventory item and return 200 status", async () => {
      req.params = { id: "1" };
      req.body = { productId: "123", quantity: 15, location: "Warehouse B" };
      const updatedItem = { productId: "123", quantity: 15, location: "Warehouse B" };

      jest.spyOn(Inventory, "findByIdAndUpdate").mockResolvedValue(updatedItem as any);

      await updateInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Inventory item updated successfully.",
        data: updatedItem,
      });
    });

    it("should return 400 status if productId or quantity is missing", async () => {
      req.params = { id: "1" };
      req.body = { location: "Warehouse B" };

      await updateInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Product ID and quantity are required." });
    });

    it("should return 500 status on error", async () => {
      req.params = { id: "1" };
      req.body = { productId: "123", quantity: 15, location: "Warehouse B" };
      jest.spyOn(Inventory, "findByIdAndUpdate").mockRejectedValue(new Error("Failed to update item"));

      await updateInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error updating inventory item.",
        error: "Failed to update item",
      });
    });
  });

  describe("deleteInventory", () => {
    it("should delete an inventory item and return 200 status", async () => {
      req.params = { id: "1" };
      jest.spyOn(Inventory, "findByIdAndDelete").mockResolvedValue({} as any);

      await deleteInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Inventory item deleted successfully." });
    });

    it("should return 500 status on error", async () => {
      req.params = { id: "1" };
      jest.spyOn(Inventory, "findByIdAndDelete").mockRejectedValue(new Error("Failed to delete item"));

      await deleteInventory(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error deleting inventory item.",
        error: "Failed to delete item",
      });
    });
  });
});