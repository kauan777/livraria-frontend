import Image from "next/image";
import React from "react";
import { BookProps } from "../@types/book";
import { useCart } from "../contexts/CartContex";
import { formatCurrency } from "../utils/formatCurrency";

interface BookComponentProps {
  book: BookProps;
}

function Book({ book }: BookComponentProps) {
  const { handleAddItemToCart } = useCart();

  return (
    <div className="w-full md:max-w-[280px] bg-white shadow-lg border min-h-[400px] rounded">
      <div className="relative w-full h-[200px]">
        <Image
          src={"/book.webp"}
          fill
          alt="Image livro"
          className="object-cover"
        />
      </div>
      <div className="py-4 px-6 flex flex-col">
        <div className="flex flex-col-reverse md:flex-row items-start justify-between md:items-center">
          <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
          <small className="text-gray-500 mb-2 md:mb-0">{book.category}</small>
        </div>
        <span className="mt-2 h-[40px] block font-normal text-sm text-gray-600">
          {book.description}
        </span>
        <span className="block mt-2 font-semibold text-xl text-gray-700">
          {formatCurrency(book.price)}
        </span>
        <button
          onClick={() => handleAddItemToCart(book)}
          className="mt-2 border border-gray-400 shadow-sm text-gray-500 font-semibold py-4 px-3 rounded text-sm  hover:bg-red-600 hover:text-gray-50 transition-colors"
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  );
}

export default Book;
