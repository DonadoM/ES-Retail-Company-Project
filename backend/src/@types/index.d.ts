// src/@types/express/index.d.ts
import * as express from "express";
import { IUser } from "../../models/userModel"; // Asegúrate de que la ruta sea correcta

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
