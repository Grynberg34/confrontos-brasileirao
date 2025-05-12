import React from 'react';
import { render, screen } from '@testing-library/react';
import Tools from '../Tools';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  Link.displayName = 'NextLink';
  return Link;
});

describe('Tools Component', () => {
  it('renders all links with correct text and titles', () => {
    render(<Tools />);

    expect(screen.getByText('Histórico de confrontos')).toBeInTheDocument();
    expect(screen.getByText('Tabela rodada a rodada')).toBeInTheDocument();
    expect(screen.getByText('Ranking de campanhas')).toBeInTheDocument();
    expect(screen.getByText('Recordes coletivos')).toBeInTheDocument();

    expect(screen.getByText('Histórico de confrontos').closest('a')).toHaveAttribute('href', '/confrontos');
    expect(screen.getByText('Tabela rodada a rodada').closest('a')).toHaveAttribute('href', '/tabela');
    const rankingLink = screen.getByText('Ranking de campanhas').closest('a');
    expect(rankingLink).not.toBeNull();
    expect(rankingLink).toHaveAttribute('href', '/campanhas');
    expect(screen.getByText('Recordes coletivos').closest('a')).toHaveAttribute('href', '/recordes');
  });

  it('renders links with the correct href attributes', () => {
    render(<Tools />);

    expect(screen.getByText('Histórico de confrontos').closest('a')).toHaveAttribute('href', '/confrontos');
    expect(screen.getByText('Tabela rodada a rodada').closest('a')).toHaveAttribute('href', '/tabela');
    expect(screen.getByText('Ranking de campanhas').closest('a')).toHaveAttribute('href', '/campanhas');
    expect(screen.getByText('Recordes coletivos').closest('a')).toHaveAttribute('href', '/recordes');
  });
});