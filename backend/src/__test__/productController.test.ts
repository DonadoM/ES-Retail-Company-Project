import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/productModel";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

jest.mock("../models/productModel");

describe("Product Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    res = { status: statusMock, json: jsonMock };
    req = {
      params: {},
      body: {},
    };
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return a list of products", async () => {
      const products = [{ name: "Product1" }, { name: "Product2" }];
      (Product.find as jest.Mock).mockResolvedValue(products);

      await getProducts(req as Request, res as Response);

      expect(Product.find).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(products);
    });

    it("should handle errors when fetching products", async () => {
      const error = new Error("Database error");
      (Product.find as jest.Mock).mockRejectedValue(error);

      await getProducts(req as Request, res as Response);

      expect(Product.find).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error al obtener los productos",
        error: error.message,
      });
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      req.body = { name: "New Product" };
      const savedProduct = { _id: "1", name: "New Product" };

      // Mock the save method on the Product prototype
      jest.spyOn(Product.prototype, "save").mockResolvedValue(savedProduct);

      await createProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Product created successfully",
        product: savedProduct,
      });
    });

    it("should handle errors when creating a product", async () => {
      const error = new Error("Creation error");
      req.body = { name: "Invalid Product" };

      // Mock the save method to throw an error
      jest.spyOn(Product.prototype, "save").mockRejectedValue(error);

      await createProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error al crear el producto",
        error: error.message,
      });
    });
  });

  describe("updateProduct", () => {
    it("should update a product by ID", async () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Product" };
      const updatedProduct = { _id: "1", name: "Updated Product" };
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedProduct
      );

      await updateProduct(req as Request, res as Response);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith("1", req.body, {
        new: true,
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    });

    it("should return 404 if product is not found", async () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Product" };
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("should handle errors when updating a product", async () => {
      const error = new Error("Update failed");
      req.params = { id: "1" };
      req.body = { name: "Updated Product" };
      (Product.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      await updateProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error updating product",
        error: error.message,
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product by ID", async () => {
      req.params = { id: "507f191e810c19729de860ea" }; // Valid ObjectId
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: "507f191e810c19729de860ea",
      });

      await deleteProduct(req as Request, res as Response);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
        "507f191e810c19729de860ea"
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Product deleted successfully",
      });
    });

    it("should return 404 if product is not found", async () => {
      req.params = { id: "507f191e810c19729de860ea" };
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await deleteProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("should return 400 if the product ID is invalid", async () => {
      req.params = { id: "invalid-id" };

      await deleteProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid product ID" });
    });

    it("should return a 500 error if deletion fails", async () => {
      req.params = { id: "507f191e810c19729de860ea" };
      const error = new Error("Deletion failed");
      (Product.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

      await deleteProduct(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Error deleting product",
        error: "Deletion failed",
      });
    });
  });
});
