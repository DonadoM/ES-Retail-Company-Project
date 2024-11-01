import request from "supertest";
import express, { Express } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import Product from "../models/productModel";

jest.mock("../models/productModel");

const app: Express = express();
app.use(express.json());

app.get("/api/products", getProducts);
app.post("/api/products", createProduct);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);

describe("Product Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProductData = {
    name: "Product 1",
    description: "Description 1",
    price: 100,
    category: "Category 1",
    stock: 10,
  };

  const checkResponse = (response: any, expectedStatus: number, expectedBody: any) => {
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  };

  describe("getProducts", () => {
    it("should return an array of products", async () => {
      const mockData = [
        mockProductData,
        { ...mockProductData, name: "Product 2", price: 200 },
      ];
      (Product.find as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get("/api/products");

      checkResponse(response, 200, mockData);
    });

    it("should return a 500 error if retrieval fails", async () => {
      (Product.find as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/products");

      checkResponse(response, 500, {
        message: "Error al obtener los productos", // Este mensaje debe coincidir con el controlador
        error: "Database error",
      });
    });
  });

  describe("createProduct", () => {
    it("should create a new product and return it", async () => {
      const mockData = { ...mockProductData, _id: "newId" };
      (Product.prototype.save as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).post("/api/products").send(mockProductData);

      checkResponse(response, 201, {
        message: "Product created successfully", // Este mensaje debe coincidir con el controlador
        product: mockData,
      });
    });

    it("should return a 400 error if creation fails", async () => {
      (Product.prototype.save as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/api/products").send(mockProductData);

      checkResponse(response, 400, {
        message: "Error al crear el producto", // Este mensaje debe coincidir con el controlador
        error: "Database error",
      });
    });
  });

  describe("updateProduct", () => {
    it("should update a product and return a success message", async () => {
      const mockUpdatedProduct = { ...mockProductData, _id: "1" };
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedProduct);

      const response = await request(app).put("/api/products/1").send(mockProductData);

      checkResponse(response, 200, {
        message: "Product updated successfully", // Este mensaje debe coincidir con el controlador
        product: mockUpdatedProduct, // Asegúrate de devolver el producto actualizado
      });
    });

    it("should return a 404 error if product not found", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put("/api/products/1").send(mockProductData);

      checkResponse(response, 404, {
        message: "Product not found", // Este mensaje debe coincidir con el controlador
      });
    });

    it("should return a 500 error if update fails", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).put("/api/products/1").send(mockProductData);

      checkResponse(response, 500, {
        message: "Error updating product", // Este mensaje debe coincidir con el controlador
        error: "Database error",
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product and return a success message", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const response = await request(app).delete("/api/products/1");

      checkResponse(response, 200, {
        message: "Product deleted successfully", // Este mensaje debe coincidir con el controlador
      });
    });

    it("should return a 500 error if deletion fails", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).delete("/api/products/1");

      checkResponse(response, 500, {
        message: "Error deleting product", // Este mensaje debe coincidir con el controlador
        error: "Database error",
      });
    });

    it("should return a 404 error if product not found", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete("/api/products/1");

      checkResponse(response, 404, { message: "Product not found" }); // Este mensaje debe coincidir con el controlador
    });
  });
});
