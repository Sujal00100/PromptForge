const ApiResponse = require("../utils/ApiResponse");
const { MAX_PROMPT_LENGTH, MAX_TASK_LENGTH } = require("../utils/constants");

/**
 * Validates the request body for creating / updating a prompt.
 * Runs before the controller.
 */
const validatePrompt = (req, res, next) => {
  const { task, originalPrompt, rewrittenPrompt, score } = req.body;

  const errors = [];

  // ── Required fields ─────────────────────────────────────────
  if (!task || (typeof task === "string" && task.trim().length === 0)) {
    errors.push("'task' is required and cannot be empty");
  } else if (typeof task === "string" && task.trim().length > MAX_TASK_LENGTH) {
    errors.push(`'task' must be ${MAX_TASK_LENGTH} characters or less`);
  }

  if (
    !originalPrompt ||
    (typeof originalPrompt === "string" && originalPrompt.trim().length === 0)
  ) {
    errors.push("'originalPrompt' is required and cannot be empty");
  } else if (
    typeof originalPrompt === "string" &&
    originalPrompt.trim().length > MAX_PROMPT_LENGTH
  ) {
    errors.push(
      `'originalPrompt' must be ${MAX_PROMPT_LENGTH} characters or less`
    );
  }

  if (
    !rewrittenPrompt ||
    (typeof rewrittenPrompt === "string" && rewrittenPrompt.trim().length === 0)
  ) {
    errors.push("'rewrittenPrompt' is required and cannot be empty");
  } else if (
    typeof rewrittenPrompt === "string" &&
    rewrittenPrompt.trim().length > MAX_PROMPT_LENGTH
  ) {
    errors.push(
      `'rewrittenPrompt' must be ${MAX_PROMPT_LENGTH} characters or less`
    );
  }

  if (!score || typeof score !== "object") {
    errors.push("'score' object is required");
  }

  // ── Return errors or proceed ────────────────────────────────
  if (errors.length > 0) {
    return ApiResponse.error(res, 400, "Validation failed", errors.join("; "));
  }

  next();
};

module.exports = validatePrompt;
