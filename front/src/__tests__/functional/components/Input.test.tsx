import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/UI/Input';

describe('Input Component - Tests Fonctionnels', () => {
  it('devrait afficher le label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('devrait afficher le message d\'erreur', () => {
    render(<Input error="Ce champ est requis" />);
    expect(screen.getByText('Ce champ est requis')).toBeInTheDocument();
  });

  it('devrait accepter la saisie utilisateur', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Entrez votre email" />);
    
    const input = screen.getByPlaceholderText('Entrez votre email');
    await user.type(input, 'test@example.com');
    
    expect(input).toHaveValue('test@example.com');
  });

  it('devrait appeler onChange', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'a');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('devrait appliquer le style d\'erreur', () => {
    render(<Input error="Erreur" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-red-500');
  });

  it('devrait appliquer le style normal sans erreur', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-gray-700');
  });

  it('devrait accepter un type password', () => {
    const { container } = render(<Input type="password" />);
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('devrait être désactivé', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('devrait appliquer des classes personnalisées', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-input');
  });

  it('devrait accepter un placeholder', () => {
    render(<Input placeholder="Placeholder text" />);
    expect(screen.getByPlaceholderText('Placeholder text')).toBeInTheDocument();
  });
});
