import { Request, Response } from "express";
import * as allocationService from "../services/allocation.service";

export const processAllocation = async (
  req: Request,
  res: Response
) => {
  try {
    const allocations =
      await allocationService.processAllocation();

    res.status(200).json({
      success: true,
      message: "Allocation completed successfully",
      data: allocations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllocations = async (
  req: Request,
  res: Response
) => {
  try {
    const allocations =
      await allocationService.getAllocations();

    res.status(200).json({
      success: true,
      data: allocations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};