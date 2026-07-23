/**
 * Standardized API response helpers.
 * Ensures every response from the backend follows a consistent shape.
 */

class ApiResponse {
  /**
   * Send a success response.
   * @param {import('express').Response} res
   * @param {number} statusCode
   * @param {string} message
   * @param {*} data
   */
  static success(res, statusCode, message, data = null) {
    const response = {
      success: true,
      message,
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response.
   * @param {import('express').Response} res
   * @param {number} statusCode
   * @param {string} error
   * @param {string} [details]
   */
  static error(res, statusCode, error, details = undefined) {
    const response = {
      success: false,
      error,
    };

    if (details) {
      response.details = details;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
