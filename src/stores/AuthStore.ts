import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import api from '../services/api';

type User = {
  login: string;
	avatar_url: string;
	url: string;
	html_url: string;
	type: string;
	gists_url: string;
}

type AuthStore = {
  token: string | null;
  isLoggedIn: boolean;
  userData: User | null;
  actions: {
    login: (newToken: string) => void;
    logout: () => void;
  }
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      userData: null,
      actions: {
        login: async (newToken: string) => {
          try {
            console.log('Logging in with token:', newToken);
            localStorage.setItem('token', newToken);
            const response = await api.get('/user');
            const data = response.data as User;
            set({
              token: newToken,
              isLoggedIn: true,
              userData: data,
            });
          } catch (error) {
            console.error('Error during login:', error);
            set({
              token: null,
              isLoggedIn: false,
              userData: null,
            });
            localStorage.removeItem('token');
            return;
          }
          
        },
        logout: () => {
          set({
            token: null,
            isLoggedIn: false,
            userData: null,
          });
          localStorage.removeItem('token');
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // unique name for the storage // use localStorage as the storage
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }), // persist only the token, isLoggedIn, and user
    }
  )
);

export const useAuthData = () => {
  const { token, isLoggedIn, userData } = useAuthStore();
  return { token, isLoggedIn, userData };
}

export const useAuthActions = () => {
  const { actions } = useAuthStore();
  return actions;
}

