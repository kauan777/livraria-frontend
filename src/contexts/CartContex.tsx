import { useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { BookProps } from "../@types/book";
import { Toaster, toast } from "react-hot-toast";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextProvider {
  cart: BookProps[];
  count: number;
  total: number;
  walletBallance: number;
  handleAddItemToCart(product: BookProps): void;
  handleRemoveItemToCart(idProduct: string): void;
  handleIncrementQuantity(idProduct: string): void;
  handleDecrementQuantity(idProduct: string, quantity: number): void;
  buy(totalBuy: number): void;

  clearCart(): void;
}

export const CartContext = createContext({} as CartContextProvider);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<BookProps[]>([]);
  const [walletBallance, setWalletBalance] = useState<number>(() => {
    const { walletBallance: walletBallanceCookie } = parseCookies();

    if (!walletBallanceCookie) {
      return 500;
    }
    return Number(walletBallanceCookie);
  });

  useEffect(() => {
    const { cart: cartCookie } = parseCookies();
    const { walletBallance: walletBallanceCookie } = parseCookies();
    if (cartCookie) {
      setCart(JSON.parse(cartCookie));
    }
    if (walletBallance) {
      setWalletBalance(Number(walletBallanceCookie));
    }
  }, []);

  const initialValueCount = 0;
  const count = cart.reduce(
    (acc, current) => acc + Number(current?.quantity),
    initialValueCount
  );

  const initialValue = 0;
  const total = cart.reduce(
    (acc, current) => acc + Number(current?.quantity) * current.price,
    initialValue
  );

  useEffect(() => {
    if (cart.length !== 0) {
      saveCartToCookie();
      return;
    }
    destroyCookie(null, "cart");
  }, [cart]);

  useEffect(() => {
    saveWalletBalnaceToCookie();
  }, [buy]);

  function saveCartToCookie() {
    setCookie(null, "cart", JSON.stringify(cart), {
      maxAge: 60 * 60 * 60 * 1, // 1 hour
    });
  }

  function saveWalletBalnaceToCookie() {
    setCookie(null, "walletBallance", walletBallance.toString());
  }

  function handleAddItemToCart(product: BookProps) {
    const isAlreadyAdded = cart.some((item) => item.id == product.id);

    if (isAlreadyAdded) {
      toast.error("Produto já foi adicionado");
      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
    toast.success("Adicionado com sucesso");
  }

  function handleRemoveItemToCart(idProduct: string) {
    const filteredCart = cart.filter((item) => item.id !== idProduct);
    setCart(filteredCart);
  }

  function handleIncrementQuantity(idProduct: string) {
    const newArray: BookProps[] = cart.map((item) => {
      if (item.id == idProduct) {
        return {
          ...item,
          quantity: Number(item.quantity) + 1,
        };
      }
      return {
        ...item,
      };
    });
    setCart(newArray);
  }

  function buy(totalBuy: number) {
    setWalletBalance(walletBallance - totalBuy);
  }

  function handleDecrementQuantity(idProduct: string, quantity: number) {
    if (quantity == 1) {
      handleRemoveItemToCart(idProduct);
      return;
    }

    const newArray: BookProps[] = cart.map((item) => {
      if (item.id == idProduct) {
        return {
          ...item,
          quantity: Number(item.quantity) - 1,
        };
      }
      return {
        ...item,
      };
    });
    setCart(newArray);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        handleDecrementQuantity,
        walletBallance,
        handleIncrementQuantity,
        buy,
        total,
        cart,
        handleAddItemToCart,
        clearCart,
        handleRemoveItemToCart,
        count,
      }}
    >
      <div>
        <Toaster />
      </div>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
