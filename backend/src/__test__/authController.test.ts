import request from "supertest";
import express, { Express } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAdminDashboard,
} from "../controllers/authController";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock the User model and bcrypt
jest.mock("../models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app: Express = express();
app.use(express.json());

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.get("/api/profile", getUserProfile);
app.get("/api/admin/dashboard", getAdminDashboard);

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  const checkResponse = (
    response: any,
    expectedStatus: number,
    expectedBody: any
  ) => {
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  };

  describe("registerUser", () => {
    it("should register a new user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null); // No existe el usuario
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.prototype.save as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post("/api/register")
        .send(mockUserData);

      checkResponse(response, 201, { message: "User registered successfully" });
    });

    it("should return a 400 error if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUserData); // Usuario existe

      const response = await request(app)
        .post("/api/register")
        .send(mockUserData);

      checkResponse(response, 400, { message: "User already exists" });
    });

    it("should return a 500 error if registration fails", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .post("/api/register")
        .send(mockUserData);

      checkResponse(response, 500, { message: "Error registering user" });
    });
  });

  describe("loginUser", () => {
    it("should log in a user and return a token", async () => {
      const mockUser = { ...mockUserData, password: "hashedPassword" };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      const response = await request(app).post("/api/login").send({
        email: mockUser.email,
        password: mockUserData.password,
      });

      checkResponse(response, 200, { token: "mockToken" });
    });

    it("should return a 401 error if email is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/api/login").send(mockUserData);

      checkResponse(response, 401, { message: "Invalid email or password" });
    });

    it("should return a 401 error if password is invalid", async () => {
      const mockUser = { ...mockUserData, password: "hashedPassword" };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const response = await request(app).post("/api/login").send(mockUserData);

      checkResponse(response, 401, { message: "Invalid email or password" });
    });
  });
  describe("getUserProfile", () => {
    it("should return the user profile", async () => {
      const mockUser = { ...mockUserData, _id: "userId" };
      (User.findById as jest.Mock).mockImplementation(() => {
        return {
          select: jest.fn().mockResolvedValue(mockUser), // Simular select
        };
      });
      const req: any = { user: { _id: "userId" } }; // Simular req.user

      const response = await request(app).get("/api/profile").set(req);

      checkResponse(response, 200, { user: mockUser });
    });

    it("should return a 404 error if user not found", async () => {
      (User.findById as jest.Mock).mockImplementation(() => {
        return {
          select: jest.fn().mockResolvedValue(null), // Simular select para un usuario no encontrado
        };
      });
      const req: any = { user: { _id: "userId" } }; // Simular req.user

      const response = await request(app).get("/api/profile").set(req);

      checkResponse(response, 404, { message: "User not found" });
    });
  });

  describe("getAdminDashboard", () => {
    it("should return admin dashboard data", async () => {
      const response = await request(app).get("/api/admin/dashboard");

      checkResponse(response, 200, { message: "Admin dashboard data" });
    });
  });
});
