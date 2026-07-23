const express = require("express");
const router = express.Router();
const {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  clearPrompts,
} = require("../controllers/promptController");
const validatePrompt = require("../middlewares/validatePrompt");

// ─── Routes ───────────────────────────────────────────────────────

// GET  /api/prompts     — must come before DELETE /api/prompts
// POST /api/prompts     — validate body before saving
router.route("/").get(getPrompts).post(validatePrompt, createPrompt).delete(clearPrompts);

// Routes with :id parameter
router
  .route("/:id")
  .get(getPromptById)
  .put(updatePrompt)
  .delete(deletePrompt);

module.exports = router;
