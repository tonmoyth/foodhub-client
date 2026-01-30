export const getCart = () => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("meals-card");
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart: any) => {
  localStorage.setItem("meals-card", JSON.stringify(cart));
};

export const addToCart = (item: any) => {
  const cart = getCart();

  const existing = cart.find((c: any) => c.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  if (cart.length > 1) {
    return {
      success: false,
      message: "Please confirm your existing order before adding another meal.",
    };
  }

  setCart(cart);
};
