import React, { FormEvent, useState } from "react";

import { useCart } from "../contexts/CartContex";
import Image from "next/image";
import { formatCurrency } from "../utils/formatCurrency";
import Link from "next/link";
import { PaymentMethods } from "../components/MethodsPayment";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import nookies from "nookies";

export default function Checkout() {
  const { cart, total, buy, walletBallance, clearCart, count } = useCart();
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  async function handleCreateOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (walletBallance < total) {
      toast.error("Saldo insuficiente");
      return;
    }

    await api.post("/orders", {
      emailCustomer: email,
      total,
      countItems: count,
    });
    buy(total);
    clearCart();
    toast.success("Pedido feito com sucesso");
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 1700);
  }

  return (
    <div className="bg-white">
      <div
        className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-indigo-500"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16">
        <section
          aria-labelledby="summary-heading"
          className="bg-indigo-500 text-indigo-500 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-1"
        >
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <dl>
              <dt className="text-sm font-medium text-white">Total</dt>

              <dd className="mt-1 text-3xl font-extrabold text-white">
                {formatCurrency(total)}
              </dd>
            </dl>

            <ul
              role="list"
              className="hidden lg:block text-sm font-medium divide-y divide-white divide-opacity-10"
            >
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start py-6 space-x-4"
                >
                  <Image
                    width={80}
                    height={80}
                    src={"/book.webp"}
                    alt={product.title}
                    className="flex-none w-20 h-20 rounded-md object-center object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">
                      {product.title} ({product.quantity})
                    </h3>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                  </div>
                  <p className="flex-none text-base font-medium text-white">
                    {formatCurrency(product.price)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-2"
        >
          <form onSubmit={(e) => handleCreateOrder(e)}>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <div>
                <h3
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Informações pessoais
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="h-8 p-2 block w-full border-gray-300 border rounded-md shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Detalhes do pagamento
                </h3>

                <PaymentMethods />
              </div>

              <div className="mt-10">
                <div className="mt-6 flex items-center">
                  <input
                    required
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="same-as-shipping"
                      className="text-sm font-medium text-gray-900"
                    >
                      Concordo com as politíca de privacidade
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t gap-2 border-gray-200">
                <Link href="/">
                  <button
                    type="submit"
                    className="border-indigo-500 text-indigo-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium  "
                  >
                    Voltar
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-indigo-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const { cart: cartCookie } = nookies.get(ctx);

  if (!cartCookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
