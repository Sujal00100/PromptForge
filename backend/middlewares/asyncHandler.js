/**
 * Wraps an async express route handler so rejected promises
 * are automatically forwarded to the error-handling middleware.
 *
 * Usage:
 *   router.get('/items', asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
