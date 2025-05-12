import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Display from '../Display';
import { resetTimes } from '@/store/slices/timesSlice';
import { fetchPartidas } from '@/store/slices/partidasSlice';
import { TimesState } from '@/store/types/times';
import { PartidasState } from '@/store/types/partidas';
import { Store } from "redux";

export interface RootState {
  times: TimesState;
  partidas: PartidasState;
}

jest.mock('@/store/slices/partidasSlice', () => ({
    ...jest.requireActual('@/store/slices/partidasSlice'),
    fetchPartidas: jest.fn(() => ({ type: 'partidas/fetch' })),
}));

describe('Display Component', () => {
  let mockState: RootState;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      times: {
        timeX: null,
        timeY: null,
        list: [],
        loading: false,
        error: null,
      },
      partidas: {
        data: null,
        loading: false,
        error: null,
      },
    } as RootState;

    mockDispatch = jest.fn();
  });

  const renderWithProvider = (component: React.ReactNode, state: RootState) => {
    const mockStore = {
      getState: () => state,
      subscribe: jest.fn(),
      dispatch: mockDispatch,
    };

    return render(<Provider store={mockStore as unknown as Store}>{component}</Provider>);
  };

  it('renders placeholders when timeX and timeY are null', () => {
    renderWithProvider(<Display />, mockState);

    const placeholders = document.getElementsByClassName('display__placeholder');
    expect(placeholders).toHaveLength(2);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders team images when timeX and timeY are set', () => {
    mockState.times.timeX = 'teamA';
    mockState.times.timeY = 'teamB';

    renderWithProvider(<Display />, mockState);

    expect(screen.getByAltText('teamA')).toBeInTheDocument();
    expect(screen.getByAltText('teamB')).toBeInTheDocument();
  });

  it('renders the "mudar times" button when either timeX or timeY is not null', () => {
    mockState.times.timeX = 'teamA';

    renderWithProvider(<Display />, mockState);

    expect(screen.getByText('mudar times')).toBeInTheDocument();
  });

  it('renders the "pesquisar confronto" button when both timeX and timeY are set', () => {
    mockState.times.timeX = 'teamA';
    mockState.times.timeY = 'teamB';

    renderWithProvider(<Display />, mockState);

    expect(screen.getByText('pesquisar confronto')).toBeInTheDocument();
  });

  it('disables the "pesquisar confronto" button when loading is true', () => {
    mockState.times.timeX = 'teamA';
    mockState.times.timeY = 'teamB';
  
    renderWithProvider(<Display />, mockState);
  
    const button = screen.getByRole('button', { name: /pesquisar confronto/i });
    fireEvent.click(button);
  
    const updatedButton = screen.getByRole('button', { name: '' });
    expect(updatedButton).toBeDisabled();
  });

  it('dispatches resetTimes when "mudar times" button is clicked', () => {
    mockState.times.timeX = 'teamA';

    renderWithProvider(<Display />, mockState);

    const button = screen.getByText('mudar times');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(resetTimes());
  });

  it('dispatches fetchPartidas when "pesquisar confronto" button is clicked', () => {
    jest.useFakeTimers();
    mockState.times.timeX = 'teamA';
    mockState.times.timeY = 'teamB';
  
    renderWithProvider(<Display />, mockState);
  
    const button = screen.getByText('pesquisar confronto');
    fireEvent.click(button);
  
    jest.runAllTimers();
  
    expect(mockDispatch).toHaveBeenCalledWith(fetchPartidas({ timeX: 'teamA', timeY: 'teamB' }));
  
    jest.useRealTimers();
  });
});