const { validateRequest, schemas } = require('../../../middlerware/validation');

describe('Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, query: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('validateRequest', () => {
    it('devrait passer la validation avec des données valides', () => {
      const mockSchema = {
        validate: jest.fn().mockReturnValue({ error: null })
      };

      const middleware = validateRequest(mockSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('devrait retourner 400 avec des données invalides', () => {
      const mockSchema = {
        validate: jest.fn().mockReturnValue({
          error: {
            details: [{ message: 'Validation error' }]
          }
        })
      };

      const middleware = validateRequest(mockSchema);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('schemas', () => {
    it('devrait avoir un schéma pour createSkin', () => {
      expect(schemas.createSkin).toBeDefined();
    });

    it('devrait avoir un schéma pour register', () => {
      expect(schemas.register).toBeDefined();
    });

    it('devrait avoir un schéma pour login', () => {
      expect(schemas.login).toBeDefined();
    });
  });
});
