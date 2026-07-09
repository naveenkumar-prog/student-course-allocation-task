import { Router } from "express";

import {
  processAllocation,
  getAllocations,
} from "../controllers/allocation.controller";

const router = Router();

router.post("/process", processAllocation);

router.get("/", getAllocations);

export default router;