import { Request, Response } from "express";
import * as preferenceService from "../services/preference.service";

export const createPreferences = async (
  req: Request,
  res: Response
) => {

  try {

    const studentId = Number(req.params.studentId);

    const { preferences } = req.body;

    await preferenceService.createPreferences(
      studentId,
      preferences
    );

    res.status(201).json({
      success: true,
      message: "Preferences added successfully",
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const getPreferences = async (
    req: Request,
    res: Response
) => {

    try {

        const studentId = Number(req.params.studentId);

        const preferences = await preferenceService.getPreferences(studentId);

        res.status(200).json({
            success: true,
            data: preferences
        });

    } catch (error:any) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export const updatePreferences = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = Number(req.params.studentId);

    const { preferences } = req.body;

    const updatedPreferences =
      await preferenceService.updatePreferences(
        studentId,
        preferences
      );

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      data: updatedPreferences,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePreferences = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = Number(req.params.studentId);

    const deleted = await preferenceService.deletePreferences(studentId);

    res.status(200).json({
      success: true,
      message: "Preferences deleted successfully",
      deletedCount: deleted.count,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};