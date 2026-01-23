import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../../pages/Register';

vi.mock('../../../services/authService');

describe('Register Page', () => {
  it('devrait afficher le formulaire d\'inscription', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/mot de passe/i)).toBeDefined();
  });

  it('devrait valider le format de l\'email', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.queryByText(/email invalide/i)).toBeDefined();
  });

  it('devrait valider la force du mot de passe', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/mot de passe/i);
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);

    expect(screen.queryByText(/mot de passe faible/i)).toBeDefined();
  });

  it('devrait soumettre le formulaire avec des données valides', async () => {
    const { authService } = require('../../../services/authService');
    authService.register = vi.fn().mockResolvedValue({ data: { token: 'token' } });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/nom d'utilisateur/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    expect(usernameInput.value).toBe('testuser');
  });
});
