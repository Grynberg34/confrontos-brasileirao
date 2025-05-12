import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Teams from '../Times';
import { fetchTimes, addTime } from '@/store/slices/timesSlice';
import { TimesState } from '@/store/types/times';
import { Store } from "redux";

export interface RootState {
  times: TimesState;
}

jest.mock('@/store/slices/timesSlice', () => ({
  ...jest.requireActual('@/store/slices/timesSlice'),
  fetchTimes: jest.fn(() => ({ type: 'times/fetchAll' })),
  addTime: jest.fn((time) => ({ type: 'times/addTime', payload: time })),
}));

describe('Teams Component', () => {
  let mockState: RootState;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      times: {
        list: [],
        timeX: null,
        timeY: null,
        loading: false,
        error: null,
      },
    };

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

  it('renders "carregando times..." when the list is empty', () => {
    renderWithProvider(<Teams />, mockState);

    expect(screen.getByText('carregando times...')).toBeInTheDocument();
  });

  it('dispatches fetchTimes when the component mounts and the list is empty', () => {
    renderWithProvider(<Teams />, mockState);

    expect(mockDispatch).toHaveBeenCalledWith(fetchTimes());
  });

  it('renders the list of teams when the list is populated', () => {
    mockState.times.list = ['teamA', 'teamB', 'teamC'];

    renderWithProvider(<Teams />, mockState);

    expect(screen.getByAltText('teamA')).toBeInTheDocument();
    expect(screen.getByAltText('teamB')).toBeInTheDocument();
    expect(screen.getByAltText('teamC')).toBeInTheDocument();
  });

  it('dispatches addTime when a team image is clicked', () => {
    mockState.times.list = ['teamA', 'teamB'];

    renderWithProvider(<Teams />, mockState);

    const teamAImage = screen.getByAltText('teamA');
    fireEvent.click(teamAImage);

    expect(mockDispatch).toHaveBeenCalledWith(addTime('teamA'));
  });

  it('does not dispatch addTime if the clicked team is already selected as timeX', () => {
    mockState.times.list = ['teamA', 'teamB'];
    mockState.times.timeX = 'teamA';

    renderWithProvider(<Teams />, mockState);

    const teamAImage = screen.getByAltText('teamA');
    fireEvent.click(teamAImage);

    expect(mockDispatch).not.toHaveBeenCalledWith(addTime('teamA'));
  });

  it('scrolls to the top when a team is clicked on small screens', () => {
    mockState.times.list = ['teamA', 'teamB'];

    global.innerWidth = 767;
    global.scrollTo = jest.fn();

    renderWithProvider(<Teams />, mockState);

    const teamAImage = screen.getByAltText('teamA');
    fireEvent.click(teamAImage);

    expect(global.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});