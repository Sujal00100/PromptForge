const Prompt = require("../models/Prompt");

/**
 * Service layer — abstracts Mongoose queries from the controller.
 */
const promptService = {
  /**
   * Create a new prompt entry.
   * @param {object} data — prompt fields
   * @returns {Promise<object>}
   */
  async create(data) {
    const prompt = await Prompt.create(data);
    return prompt;
  },

  /**
   * Get all prompts, sorted newest first.
   * @returns {Promise<object[]>}
   */
  async getAll() {
    return Prompt.find().sort({ createdAt: -1 }).lean();
  },

  /**
   * Get a single prompt by ID.
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async getById(id) {
    return Prompt.findById(id).lean();
  },

  /**
   * Update a prompt by ID.
   * @param {string} id
   * @param {object} data — fields to update
   * @returns {Promise<object|null>}
   */
  async update(id, data) {
    return Prompt.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  },

  /**
   * Delete a single prompt by ID.
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async delete(id) {
    return Prompt.findByIdAndDelete(id).lean();
  },

  /**
   * Delete all prompts.
   * @returns {Promise<{deletedCount: number}>}
   */
  async deleteAll() {
    return Prompt.deleteMany({});
  },
};

module.exports = promptService;
