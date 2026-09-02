const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma unique constraint violation (e.g., email already exists)
  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'A user with this email already exists.' });
  }

  // Handle generic validation or manual errors
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
