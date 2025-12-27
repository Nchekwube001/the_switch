import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type drawerState = {
  showDrawer: boolean;
  setShowDrawer: (val: boolean) => void;
};
export const useDrawerStore = create<drawerState>()(
  persist(
    set => ({
      showDrawer: false,
      setShowDrawer: showDrawer => set(() => ({showDrawer})),
    }),
    {
      name: 'drawerState',
    },
  ),
);
