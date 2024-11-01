import request from "supertest";
import express, { Express } from "express";
import User from "../models/userModel";

// src/controllers/__tests__/userController.test.ts

// Mock the User model
jest.mock("../models/userModel");

const app: Express = express();
app.use(express.json());

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error adding user" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
});

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should return an array of users", async () => {
      const mockData = [
        { name: "John Doe", email: "john@example.com", role: "user" },
        { name: "Jane Doe", email: "jane@example.com", role: "admin" },
      ];
      (User.find as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it("should return a 500 error if retrieval fails", async () => {
      (User.find as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error retrieving users" });
    });
  });

  describe("addUser", () => {
    it("should add a new user and return it", async () => {
      const mockData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
        _id: "newId",
      };
      (User.prototype.save as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).post("/api/users").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockData);
    });

    it("should return a 400 error if adding fails", async () => {
      (User.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).post("/api/users").send({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        role: "admin",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error adding user" });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return a success message", async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const response = await request(app).delete("/api/users/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User deleted" });
    });

    it("should return a 400 error if deletion fails", async () => {
      (User.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/api/users/1");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error deleting user" });
    });
  });

  describe("updateUser", () => {
    it("should update a user and return a success message", async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      const response = await request(app).put("/api/users/1").send({
        name: "John Doe",
        email: "john@example.com",
        password: "newpassword123",
        role: "user",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User updated" });
    });

    it("should return a 400 error if update fails", async () => {
      (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).put("/api/users/1").send({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "newpassword123",
        role: "admin",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Error updating user" });
    });
  });
});
