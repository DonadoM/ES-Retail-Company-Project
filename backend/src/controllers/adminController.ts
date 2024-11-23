import { Request, Response } from "express";

// @desc    Get admin dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboard = (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
};
