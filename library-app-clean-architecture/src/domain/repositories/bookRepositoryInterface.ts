import { Book } from "@/domain/entities/book";

export interface BookRepositoryInterface {
  create(book: Book): Promise<Book>;
  // findById(id: string): Promise<Book | null>;
}
