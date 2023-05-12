import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { uuid } from '../utils/uuid';
import type { Product } from '../types/product';

const useCartService = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addProductToCart = (product: Product) => {
    const isAlreadyExists = cart.some(
      (cartItem) => cartItem.product.id === product.id,
    );

    if (isAlreadyExists) return;

    setCart((prevCart) => {
      return [
        ...prevCart,
        {
          id: uuid(),
          quantity: 1,
          product,
        },
      ];
    });
  };

  const updateProductQuantity = (targetId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.product.id !== targetId) return cartItem;

        return {
          ...cartItem,
          quantity,
        };
      });
    });
  };

  const removeProductFromCart = (targetId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== targetId),
    );
  };

  return {
    cart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  } as const;
};
export default useCartService;
