import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "@/application/dtos/book/addBookResponseDto";
import { AddBookUsecaseInterface } from "./addBookUsecaseInterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";
import { IdGeneratorInterface } from "@/domain/utils/idGeneratorInterface";
import { Book } from "@/domain/entities/book";

export class AddBookUsecase implements AddBookUsecaseInterface {
  constructor(
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface,
  ) {}

  async execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto> {
    const id = this.idGenerator.generate();
    const newBook = new Book(id, requestDto.title);

    const createdBook = await this.bookRepository.create(newBook);

    return {
      id: createdBook.id,
      title: createdBook.title,
      isAvailable: createdBook.isAvailable,
      createdAt: createdBook.createdAt,
      updatedAt: createdBook.updatedAt,
    }
  }
}