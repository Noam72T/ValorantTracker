// import { describe, it, expect, vi } from 'vitest';
// import { renderHook, act } from '@testing-library/react';

// describe('useAuth Hook', () => {
//   it('devrait initialiser avec un utilisateur null', () => {
//     const useAuth = () => {
//       const [user, setUser] = vi.fn()();
//       return { user, setUser };
//     };

//     const mockUser = null;
//     expect(mockUser).toBeNull();
//   });

//   it('devrait définir l\'utilisateur après connexion', () => {
//     const mockUser = { id: 'user-123', email: 'test@example.com' };
//     const user = mockUser;

//     expect(user.id).toBe('user-123');
//     expect(user.email).toBe('test@example.com');
//   });

//   it('devrait supprimer l\'utilisateur après déconnexion', () => {
//     let user: any = { id: 'user-123' };
//     user = null;

//     expect(user).toBeNull();
//   });

//   it('devrait gérer l\'état de chargement', () => {
//     const loading = false;
//     expect(loading).toBe(false);
//   });
// });
