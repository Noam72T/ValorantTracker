const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Cet email est déjà utilisé';
    error = { message, statusCode: 400 };
  }

  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    error = { message, statusCode: 400 };
  }

  if (err.name === 'SequelizeDatabaseError') {
    const message = 'Erreur de base de données';
    error = { message, statusCode: 500 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur serveur'
  });
};

module.exports = errorHandler;
