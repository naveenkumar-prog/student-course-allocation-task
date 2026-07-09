import { Router } from "express";
import { getStudents, registerStudent, getStudentById, updateStudent, deleteStudent } from "../controllers/student.controller";

const router = Router();

router.post("/", registerStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;