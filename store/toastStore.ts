import {create} from 'zustand';

export interface ToastState {
  variant: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isBottom?: boolean;
  desc?: string;
  type?: 'normal' | 'spin' | 'chess' | 'draft';
}

const initialState: ToastState = {
  variant: 'success',
  message: '',
  isBottom: false,
  desc: '',
  type: 'normal',
};

export interface ToastActions {
  showToast: (toastState: ToastState) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState & ToastActions>()(
  (set, get) => ({
    ...initialState,
    showToast: (toastState: ToastState) => {
      const toastMsg = get().message;
      if (toastMsg) return;
      return set({...toastState});
    },
    hideToast() {
      set({
        ...initialState,
      });
    },
  }),
);
