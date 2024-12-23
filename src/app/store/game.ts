import { createStore } from "zustand/vanilla";

export type GameState = {
  score: number;
  isGameOver: boolean;
  isGuessCorrect: boolean | null;
};

export type GameActions = {
  increaseScore: () => void;
  resetScore: () => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setIsGuessCorrect: (isGuessCorrect: boolean | null) => void;
};

export const defaultInitState: GameState = {
  score: 0,
  isGameOver: false,
  isGuessCorrect: null,
};

export type GameStore = GameState & GameActions;

export const createGameStore = (initState: GameState = defaultInitState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    increaseScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set({ score: 0 }),
    setIsGameOver: (isGameOver) => set({ isGameOver }),
    setIsGuessCorrect: (isGuessCorrect) => set({ isGuessCorrect }),
  }));
};
