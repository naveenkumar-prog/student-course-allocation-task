import { Request, Response } from "express";
import * as aiService from "../services/ai.service";

export const askAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { question } = req.body;

    const answer = await aiService.askAI(question);

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};