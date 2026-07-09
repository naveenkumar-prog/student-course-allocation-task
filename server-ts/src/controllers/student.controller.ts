import { Request, Response } from "express";
import * as studentService from "../services/student.service";

export const registerStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const student = await studentService.createStudent(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await studentService.getStudents();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
) => {
  try {
    const student = await studentService.getStudentById(
      Number(req.params.id)
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const student = await studentService.updateStudent(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response
) => {
  try {
    await studentService.deleteStudent(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};