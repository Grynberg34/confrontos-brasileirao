import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header Component', () => {
  it('renders the title and subtitle', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);

    expect(screen.getByText('Confrontos Corridos')).toBeInTheDocument();
    expect(screen.getByText('Brasileirão 2003-2025')).toBeInTheDocument();
  });

  it('renders the home icon link when not on the home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/some-page');

    render(<Header />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('does not render the home icon link when on the home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);

    expect(screen.queryByRole('link', { name: /home/i })).not.toBeInTheDocument();
  });
});