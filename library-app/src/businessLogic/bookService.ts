import { Book } from "@prisma/client";
import { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface";
import { BookServiceInterface } from "./bookServiceInterface";

// ビジネスロジック層
// 実際のアプリではこの層で条件や制約などを加えていく

export class BookService implements BookServiceInterface {

  // インターフェースを利用することで外部からリポジトリを注入できるようにする
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async add(title: string): Promise<Book> {
    return await this.bookRepository.create(title);
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}