import { Request, Response } from "express";
import * as courseService from "../services/course.service";

export const createCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const course = await courseService.createCourse(req.body);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const courses = await courseService.getCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
) => {
  try {
    const course = await courseService.getCourseById(
      Number(req.params.id)
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const course = await courseService.updateCourse(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
) => {
  try {
    await courseService.deleteCourse(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};