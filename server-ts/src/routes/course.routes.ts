import { Router } from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";

import {
  getCourseReservations,
  updateCourseReservations,
} from "../controllers/reservation.controller";

const router = Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Reservation endpoints for a course
router.get("/:courseId/reservations", getCourseReservations);
router.put("/:courseId/reservations", updateCourseReservations);

export default router;