import AppError from "../utils/AppError";

const notFoundMiddleware = (req, res, next) => {
  next(new AppError("Route not found", 404, "NOT_FOUND"));
};

export default notFoundMiddleware;
