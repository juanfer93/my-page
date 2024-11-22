import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AnimationState {
  titleText: string;
  bodyText: string;
  cursorVisible: boolean;
  setTitleText: (updater: (prev: string) => string) => void;
  setBodyText: (updater: (prev: string) => string) => void;
  toggleCursor: () => void;
}

interface FormState {
  errorTimers: { [key: string]: boolean };
  isSubmitting: boolean;
  setErrorTimers: (field: string, value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
}

export const useStore = create<ThemeState & AnimationState & FormState>((set) => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  return {
    theme: storedTheme || 'light', 
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return { theme: newTheme };
      }),
    titleText: '',
    bodyText: '',
    cursorVisible: true,
    setTitleText: (updater) => set((state) => ({ titleText: updater(state.titleText) })),
    setBodyText: (updater) => set((state) => ({ bodyText: updater(state.bodyText) })),
    toggleCursor: () => set((state) => ({ cursorVisible: !state.cursorVisible })),
    errorTimers: {},
    isSubmitting: false,
    setErrorTimers: (field, value) => {
      set((state) => ({
        errorTimers: { ...state.errorTimers, [field]: value },
      }));
    },    
    setIsSubmitting: (value) =>
      set(() => ({
        isSubmitting: value,
      })),
  };
});
