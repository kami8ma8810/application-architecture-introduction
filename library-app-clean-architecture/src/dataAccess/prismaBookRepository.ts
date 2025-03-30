import { PrismaClient, Book } from "@prisma/client";
import { BookRepositoryInterface } from "./bookRepositoryInterface";

// データアクセス層
export class PrismaBookRepository implements BookRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(title: string): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title,
        isAvailable: true,
        // ここで使用されていない createdAt などはデフォルト値が適用される
      },
    });
  }

  // 指定された Id が存在しないこともあるので nullable
  async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }
}