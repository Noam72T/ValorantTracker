import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '../../../components/UI/Loading';

describe('Loading Component - Tests Fonctionnels', () => {
  it('devrait afficher le composant de chargement', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('devrait afficher le message par défaut', () => {
    render(<Loading />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('devrait afficher un message personnalisé', () => {
    render(<Loading message="Chargement des données" />);
    expect(screen.getByText('Chargement des données')).toBeInTheDocument();
  });

  it('devrait avoir les classes de style appropriées', () => {
    const { container } = render(<Loading />);
    const loadingDiv = container.firstChild;
    expect(loadingDiv).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
  });

  it('devrait afficher l\'animation de spinner', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
