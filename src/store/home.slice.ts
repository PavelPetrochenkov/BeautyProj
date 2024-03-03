import { StateCreator } from 'zustand';

export interface HomeSlice {
  imageUriFrom: { uri: string; date: number };
  imageUriTo: { uri: string; date: number };
  isLightTheme: boolean;
  setLightTheme: (isLightTheme: boolean) => void;
  changeImageUriFrom: (imageUri: { uri: string; date: number }) => void;
  changeImageUriTo: (imageUri: { uri: string; date: number }) => void;
  clearHomeSlice: () => void;
}

const initialState = {
  imageUriFrom: { uri: '', date: 0 },
  imageUriTo: { uri: '', date: 0 },
};

export const createHomeSlice: StateCreator<HomeSlice> = (set, get) => ({
  isLightTheme: true,
  ...initialState,
  setLightTheme: (isLightTheme) => {
    set({ isLightTheme });
  },
  changeImageUriFrom: (imageUri) => {
    set({ imageUriFrom: imageUri });
  },
  changeImageUriTo: (imageUri) => {
    set({ imageUriTo: imageUri });
  },
  clearHomeSlice: () => {
    set(initialState);
  },
});
