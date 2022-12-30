import Image from "next/image";
import { NavBar } from "../components/NavBar";
import { Poppins } from "@next/font/google";
import { api } from "../utils/api";
import { BookProps } from "../@types/book";
import Book from "../components/Book";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
});

interface HomeProps {
  books: BookProps[];
}

export default function Home({ books }: HomeProps) {
  return (
    <main>
      <NavBar currentPage="home" />
      <section className="relative w-full h-[300px] ">
        <Image
          src="/banner.webp"
          fill
          alt="Banner livros"
          className="object-cover"
        />
      </section>
      <section className={`${poppins.className} px-4 md:px-8 py-8`}>
        <h2 className="block gap-1.5 items-center mb-8 font-bold text-xl w-full text-center md:text-left">
          NOSSOS PRODUTOS
        </h2>
        <div className="flex gap-8 flex-wrap justify-center md:justify-start">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { data } = await api.get("/books");

  return {
    props: { books: data },
  };
}
