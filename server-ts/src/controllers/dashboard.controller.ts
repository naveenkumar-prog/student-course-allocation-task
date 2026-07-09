import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const dashboard =
      await dashboardService.getDashboard();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseStats = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await dashboardService.getCourseStats();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};