import React from "react";
import { GrClose } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import ReactDom from "react-dom";
import { useCart } from "../../contexts/CartContex";
import { formatCurrency } from "../../utils/formatCurrency";
import Link from "next/link";

interface ModalCartProps {
  visible: boolean;
  onClose(): void;
}

function ModalCart({ visible, onClose }: ModalCartProps) {
  const {
    cart,
    handleRemoveItemToCart,
    total,
    count,
    handleIncrementQuantity,
    handleDecrementQuantity,
  } = useCart();
  if (!visible) {
    return null;
  }

  let container: any;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#__next");
    parentElem?.appendChild(rootContainer);
    container = rootContainer;
  }

  return ReactDom.createPortal(
    <div className="my-blur fixed z-50 flex justify-center items-center left-0 top-0 bg-[#000000cc] px-2 py-4  w-full h-full">
      <div className="relative bg-white w-[700px] max-h-[80%] rounded p-8  overflow-y-scroll overflow-x-hidden">
        <section className="flex justify-between">
          <div className="flex items-center gap-2">
            <FaShoppingCart size={22} />
            <h2 className="font-semibold text-xl">Carrinho</h2>
          </div>
          <button className="close-icon" type="button" onClick={onClose}>
            <GrClose />
          </button>
        </section>
        <hr className="border border-gray-300 mt-8" />

        {cart.length > 0 ? (
          <>
            <section>
              <div className="m-4 flex justify-between">
                <span className=" block">({count}) produtos</span>
                <span>
                  <b className="text-gray-600">Total:</b>{" "}
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="flex flex-col gap-4 relative ">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="w-full flex items-center justify-between p-6 bg-white border shadow-sm"
                  >
                    <h2 className="font-semibold text-lg">
                      {product.title}{" "}
                      <small className="font-normal text-gray-700">
                        {product.quantity}x
                      </small>
                    </h2>
                    <div className="flex gap-1">
                      <button>
                        <BsPlusCircle
                          onClick={() => handleIncrementQuantity(product.id)}
                          size={22}
                          className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors"
                        />
                      </button>
                      <button>
                        <BsDashCircle
                          onClick={() =>
                            handleDecrementQuantity(
                              product.id,
                              Number(product.quantity)
                            )
                          }
                          size={22}
                          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors ml-1 mr-4"
                        />
                      </button>
                      <button>
                        <FiTrash2
                          onClick={() => handleRemoveItemToCart(product.id)}
                          size={24}
                          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="w-full mt-4 flex flex-col md:flex-row bottom-0 left-0 z-40 gap-2 md:gap-4">
              <button
                onClick={onClose}
                className="w-full border border-zinc-800 py-4 font-semibold"
              >
                CONTINUAR COMPRANDO
              </button>
              <Link href="/payment" className="block w-full">
                <button className="w-full border bg-zinc-800 border-zinc-800 text-white font-semibold py-4">
                  FINALIZAR COMPRA
                </button>
              </Link>
            </section>
          </>
        ) : (
          <span className="block w-full pt-6 text-xl text-gray-500 text-center font-semibold">
            Seu carrinho está vazio :(
          </span>
        )}
      </div>
    </div>,
    container
  );
}

export { ModalCart };
