import { HomeSlice, createHomeSlice } from './home.slice';

import { create } from 'zustand';

export const useStore = create<HomeSlice>()((...a) => ({
  ...createHomeSlice(...a),
}));
