import request from "supertest";
import express, { Express } from "express";
import {
  getPromotions,
  addPromotion,
  deletePromotion,
  updatePromotion,
} from "../controllers/promotionsController";
import Promotion from "../models/promotionModel";

// Mock the Promotion model
jest.mock("../models/promotionModel");

const app: Express = express();
app.use(express.json());

// Define the routes for testing
app.get("/promotions", getPromotions);
app.post("/promotions", addPromotion);
app.delete("/promotions/:id", deletePromotion);
app.put("/promotions/:id", updatePromotion);

describe("Promotion Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /promotions", () => {
    it("should return a list of promotions", async () => {
      const mockPromotions = [
        {
          title: "Promo 1",
          discount: 10,
          startDate: "2024-01-01",
          endDate: "2024-01-10",
          channels: ["online"],
        },
        {
          title: "Promo 2",
          discount: 20,
          startDate: "2024-02-01",
          endDate: "2024-02-10",
          channels: ["store"],
        },
      ];

      (Promotion.find as jest.Mock).mockResolvedValue(mockPromotions);

      const response = await request(app).get("/promotions");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPromotions);
    });

    it("should handle errors", async () => {
      (Promotion.find as jest.Mock).mockRejectedValue(
        new Error("Error retrieving promotions")
      );

      const response = await request(app).get("/promotions");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error retrieving promotions");
    });
  });
  describe("POST /promotions", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear previous mock states
    });
  
    it("should create a new promotion", async () => {
      const newPromotion = {
        title: "Promo 3",
        discount: 15,
        startDate: "2024-03-01",
        endDate: "2024-03-10",
        channels: ["email"]
      };
  
      // Mock the save method to return newPromotion
      (Promotion.prototype.save as jest.Mock).mockResolvedValue(newPromotion);
  
      const response = await request(app).post("/promotions").send(newPromotion);
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newPromotion); // Check that the response matches the expected object
    });
  });
  

  it("should handle validation errors", async () => {
    (Promotion.prototype.save as jest.Mock).mockRejectedValue(
      new Error("Error creating promotion")
    );

    const response = await request(app).post("/promotions").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error creating promotion");
  });
});

describe("DELETE /promotions/:id", () => {
  it("should delete a promotion", async () => {
    const mockId = "12345";
    (Promotion.findByIdAndDelete as jest.Mock).mockResolvedValue({});

    const response = await request(app).delete(`/promotions/${mockId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Promotion deleted");
  });

  it("should handle errors in deletion", async () => {
    const mockId = "12345";
    (Promotion.findByIdAndDelete as jest.Mock).mockRejectedValue(
      new Error("Error deleting promotion")
    );

    const response = await request(app).delete(`/promotions/${mockId}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error deleting promotion");
  });
});

describe("PUT /promotions/:id", () => {
  it("should update a promotion", async () => {
    const mockId = "12345";
    const updatedPromotion = {
      title: "Updated Promo",
      discount: 20,
      startDate: "2024-04-01",
      endDate: "2024-04-10",
      channels: ["online"],
    };

    (Promotion.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      updatedPromotion
    );

    const response = await request(app)
      .put(`/promotions/${mockId}`)
      .send(updatedPromotion);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Promotion updated");
  });

  it("should handle update errors", async () => {
    const mockId = "12345";
    (Promotion.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("Error updating promotion")
    );

    const response = await request(app).put(`/promotions/${mockId}`).send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error updating promotion");
  });
});
