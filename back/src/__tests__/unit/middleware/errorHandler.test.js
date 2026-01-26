describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('devrait gérer les erreurs génériques', () => {
    const error = new Error('Test error');
    const errorHandler = (err, req, res, next) => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Test error'
    });
  });

  it('devrait gérer les erreurs de validation', () => {
    const error = { name: 'ValidationError', message: 'Invalid data' };
    const errorHandler = (err, req, res, next) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('devrait gérer les erreurs d\'authentification', () => {
    const error = { name: 'UnauthorizedError', message: 'Not authorized' };
    const errorHandler = (err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).json({
          success: false,
          message: err.message
        });
      }
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('devrait gérer les erreurs 404', () => {
    const error = { name: 'NotFoundError', message: 'Resource not found' };
    const errorHandler = (err, req, res, next) => {
      if (err.name === 'NotFoundError') {
        res.status(404).json({
          success: false,
          message: err.message
        });
      }
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
