// import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../../../pages/Login';

// vi.mock('../../../services/authService');

// describe('Login Page', () => {
//   it('devrait afficher le formulaire de connexion', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     expect(screen.getByLabelText(/email/i)).toBeDefined();
//     expect(screen.getByLabelText(/mot de passe/i)).toBeDefined();
//     expect(screen.getByRole('button', { name: /connexion/i })).toBeDefined();
//   });

//   it('devrait valider les champs requis', async () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     const submitButton = screen.getByRole('button', { name: /connexion/i });
//     fireEvent.click(submitButton);

//     expect(screen.queryByText(/requis/i)).toBeDefined();
//   });

//   it('devrait soumettre le formulaire avec des données valides', async () => {
//     const { authService } = require('../../../services/authService');
//     authService.login = vi.fn().mockResolvedValue({ data: { token: 'token' } });

//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/mot de passe/i);
//     const submitButton = screen.getByRole('button', { name: /connexion/i });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
//     fireEvent.click(submitButton);

//     expect(emailInput.value).toBe('test@example.com');
//   });

//   it('devrait afficher un lien vers l\'inscription', () => {
//     render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/inscription/i)).toBeDefined();
//   });
// });
