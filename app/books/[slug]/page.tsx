import { notFound } from "next/navigation";
import { books } from "../../lib/books";
import { BookLesson } from "./BookLesson";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((item) => item.slug === slug);
  if (!book) notFound();
  return <BookLesson book={book} />;
}
