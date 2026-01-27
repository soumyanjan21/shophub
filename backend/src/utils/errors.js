export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export const BadRequest = (message) => new AppError(message, 400);
export const Unauthorized = (message) => new AppError(message, 401);
export const NotFound = (message) => new AppError(message, 404);
