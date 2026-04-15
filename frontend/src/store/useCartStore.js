import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],

  addToCart: (product, qty, size, color) => {
    const item = {
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      countInStock: product.stock,
      qty,
      size,
      color,
    };

    const existItem = get().cartItems.find((x) => x.product === item.product && x.size === item.size && x.color === item.color);

    let newCartItems;
    if (existItem) {
      newCartItems = get().cartItems.map((x) =>
        x.product === existItem.product && x.size === existItem.size && x.color === existItem.color ? item : x
      );
    } else {
      newCartItems = [...get().cartItems, item];
    }

    set({ cartItems: newCartItems });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  },

  removeFromCart: (id, size, color) => {
    const newCartItems = get().cartItems.filter((x) => !(x.product === id && x.size === size && x.color === color));
    set({ cartItems: newCartItems });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },
}));

export default useCartStore;
