const asyncHandler = require("../middlewares/asyncHandler");
const promptService = require("../services/promptService");
const ApiResponse = require("../utils/ApiResponse");

// ─── CREATE ───────────────────────────────────────────────────────

/**
 * @desc    Save a new optimized prompt
 * @route   POST /api/prompts
 */
const createPrompt = asyncHandler(async (req, res) => {
  const prompt = await promptService.create(req.body);
  ApiResponse.success(res, 201, "Prompt saved successfully", prompt);
});

// ─── READ ALL ─────────────────────────────────────────────────────

/**
 * @desc    Get all prompt history (newest first)
 * @route   GET /api/prompts
 */
const getPrompts = asyncHandler(async (req, res) => {
  const prompts = await promptService.getAll();
  ApiResponse.success(res, 200, "Prompts retrieved", prompts);
});

// ─── READ ONE ─────────────────────────────────────────────────────

/**
 * @desc    Get a single prompt by ID
 * @route   GET /api/prompts/:id
 */
const getPromptById = asyncHandler(async (req, res) => {
  const prompt = await promptService.getById(req.params.id);

  if (!prompt) {
    return ApiResponse.error(res, 404, "Prompt not found");
  }

  ApiResponse.success(res, 200, "Prompt retrieved", prompt);
});

// ─── UPDATE ───────────────────────────────────────────────────────

/**
 * @desc    Update a prompt by ID
 * @route   PUT /api/prompts/:id
 */
const updatePrompt = asyncHandler(async (req, res) => {
  const prompt = await promptService.update(req.params.id, req.body);

  if (!prompt) {
    return ApiResponse.error(res, 404, "Prompt not found");
  }

  ApiResponse.success(res, 200, "Prompt updated successfully", prompt);
});

// ─── DELETE ONE ───────────────────────────────────────────────────

/**
 * @desc    Delete a single prompt by ID
 * @route   DELETE /api/prompts/:id
 */
const deletePrompt = asyncHandler(async (req, res) => {
  const prompt = await promptService.delete(req.params.id);

  if (!prompt) {
    return ApiResponse.error(res, 404, "Prompt not found");
  }

  ApiResponse.success(res, 200, "Prompt deleted successfully");
});

// ─── DELETE ALL ───────────────────────────────────────────────────

/**
 * @desc    Clear all prompt history
 * @route   DELETE /api/prompts
 */
const clearPrompts = asyncHandler(async (req, res) => {
  const result = await promptService.deleteAll();
  ApiResponse.success(
    res,
    200,
    `Cleared ${result.deletedCount} prompt(s) from history`
  );
});

module.exports = {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  clearPrompts,
};
