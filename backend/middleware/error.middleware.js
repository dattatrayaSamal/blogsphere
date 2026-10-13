const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message:
        statusCode >= 500 && process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message || "Something went wrong",
    },
  });
};

export default errorMiddleware;
