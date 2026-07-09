import { Request, Response } from "express";
import * as reservationService from "../services/reservation.service";

// =============================
// CRUD
// =============================

export const createReservation = async (
  req: Request,
  res: Response
) => {
  try {
    const reservation =
      await reservationService.createReservation(req.body);

    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReservations = async (
  req: Request,
  res: Response
) => {
  try {
    const reservations =
      await reservationService.getReservations();

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReservationById = async (
  req: Request,
  res: Response
) => {
  try {
    const reservation =
      await reservationService.getReservationById(
        Number(req.params.id)
      );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReservation = async (
  req: Request,
  res: Response
) => {
  try {
    const reservation =
      await reservationService.updateReservation(
        Number(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReservation = async (
  req: Request,
  res: Response
) => {
  try {
    await reservationService.deleteReservation(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Course Reservation APIs
// =============================

export const getCourseReservations = async (
  req: Request,
  res: Response
) => {
  try {
    const courseId = Number(req.params.courseId);

    const reservations =
      await reservationService.getCourseReservations(courseId);

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourseReservations = async (
  req: Request,
  res: Response
) => {
  try {
    const courseId = Number(req.params.courseId);

    const reservations =
      await reservationService.updateCourseReservations(
        courseId,
        req.body.reservations
      );

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};