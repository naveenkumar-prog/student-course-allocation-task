import { Router } from "express";

import {
  createPreferences,
  getPreferences,
  updatePreferences,
  deletePreferences,
} from "../controllers/preference.controller";

const router = Router();

router.post("/:studentId/preferences", createPreferences);

router.get("/:studentId/preferences", getPreferences);

router.put("/:studentId/preferences", updatePreferences);

router.delete("/:studentId/preferences", deletePreferences);

export default router;