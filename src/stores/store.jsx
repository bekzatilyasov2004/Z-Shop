import { create } from "zustand";
import axios from "axios";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const useStore = create((set) => ({
  products: [],
  cart: getCartFromLocalStorage(),
  loading: false,
  error: null,
  selectedCard: null, // Store selected bank card
  totalAmount: 0, // Total price of items in the cart

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://dummyjson.com/products');
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = state.cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
    } else {
      updatedCart = [...state.cart, { ...product, quantity: product.quantity }];
    }

    saveCartToLocalStorage(updatedCart);
    return { cart: updatedCart };
  }),

  updateCartQuantity: (id, change) => set((state) => {
    const updatedCart = state.cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + change } : item
    );

    saveCartToLocalStorage(updatedCart);
    return { cart: updatedCart };
  }),

  removeFromCart: (id) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.id !== id);

    saveCartToLocalStorage(updatedCart);
    return { cart: updatedCart };
  }),

  selectBankCard: (card) => set({ selectedCard: card }), // Select card
  calculateTotal: () => set((state) => {
    const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalAmount: total };
  }),

  clearCart: () => set({ cart: [], totalAmount: 0 }), // Clear cart
}));

export default useStore;
