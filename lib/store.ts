import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface StoreState {
  cart: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.find((i) => i.id === item.id);
          if (exists) {
            return {
              favorites: state.favorites.filter((i) => i.id !== item.id),
            };
          }
          return { favorites: [...state.favorites, item] };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'artisan-woods-storage',
    }
  )
);