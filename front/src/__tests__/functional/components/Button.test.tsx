import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../components/UI/Button';

describe('Button Component - Tests Fonctionnels', () => {
  it('devrait afficher le texte du bouton', () => {
    render(<Button>Cliquez ici</Button>);
    expect(screen.getByText('Cliquez ici')).toBeInTheDocument();
  });

  it('devrait appeler onClick quand cliqué', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Cliquer</Button>);
    
    await user.click(screen.getByText('Cliquer'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('ne devrait pas appeler onClick quand désactivé', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} disabled>Cliquer</Button>);
    
    await user.click(screen.getByText('Cliquer'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('devrait avoir le type submit', () => {
    render(<Button type="submit">Soumettre</Button>);
    const button = screen.getByText('Soumettre');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('devrait appliquer la variante primary par défaut', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button.className).toContain('bg-red-600');
  });

  it('devrait appliquer la variante danger', () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByText('Danger');
    expect(button.className).toContain('bg-red-500');
  });

  it('devrait appliquer la variante success', () => {
    render(<Button variant="success">Success</Button>);
    const button = screen.getByText('Success');
    expect(button.className).toContain('bg-green-600');
  });

  it('devrait appliquer la taille medium par défaut', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByText('Medium');
    expect(button.className).toContain('px-4 py-2');
  });

  it('devrait appliquer la taille small', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByText('Small');
    expect(button.className).toContain('px-3 py-1.5');
  });

  it('devrait appliquer la taille large', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByText('Large');
    expect(button.className).toContain('px-6 py-3');
  });

  it('devrait appliquer fullWidth', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByText('Full Width');
    expect(button.className).toContain('w-full');
  });

  it('devrait être désactivé quand disabled est true', () => {
    render(<Button disabled>Désactivé</Button>);
    const button = screen.getByText('Désactivé');
    expect(button).toBeDisabled();
  });

  it('devrait appliquer des classes personnalisées', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');
    expect(button.className).toContain('custom-class');
  });
});
