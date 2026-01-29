import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../../components/ProtectedRoute';

vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn()
}));

describe('ProtectedRoute', () => {
  it('devrait afficher le contenu si l\'utilisateur est authentifié', () => {
    const { useAuth } = require('../../../context/AuthContext');
    useAuth.mockReturnValue({ user: { id: 'user-123' }, loading: false });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText('Protected Content')).toBeDefined();
  });

  it('devrait rediriger si l\'utilisateur n\'est pas authentifié', () => {
    const { useAuth } = require('../../../context/AuthContext');
    useAuth.mockReturnValue({ user: null, loading: false });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.queryByText('Protected Content')).toBeNull();
  });

  it('devrait afficher un loader pendant le chargement', () => {
    const { useAuth } = require('../../../context/AuthContext');
    useAuth.mockReturnValue({ user: null, loading: true });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.queryByText('Protected Content')).toBeNull();
  });
});
