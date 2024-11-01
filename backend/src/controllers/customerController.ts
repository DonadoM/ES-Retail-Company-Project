import { Request, Response } from "express";
import Customer from "../models/customerModel";

// Obtener todos los clientes
export const getCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Crear un nuevo cliente
export const createCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, address, phone } = req.body;

  const newCustomer = new Customer({
    name,
    email,
    address,
    phone,
  });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await Customer.findByIdAndDelete(id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;
  try {
    await Customer.findByIdAndUpdate(id, { name, email, address, phone });
    res.json({ message: "Customer updated" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
