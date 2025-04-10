import { FindBookByIdRequestDto } from "@/application/dtos/book/findBookByIdRequestDto";
import { FindBookByIdResponseDto } from "@/application/dtos/book/findBookByIdResponseDto";
import { FindBookByIdUseCaseInterface } from "./findBookByIdUseCaseInterface";
import { BookRepositoryInterface } from "@/domain/repositories/bookRepositoryInterface";

export class FindBookByIdUseCase implements FindBookByIdUseCaseInterface {
  constructor(
    private readonly bookRepository: BookRepositoryInterface,
  ) {}

  async execute(requestDto: FindBookByIdRequestDto): Promise<FindBookByIdResponseDto | null> {
    const foundBook = await this.bookRepository.findById(requestDto.id);

    if (!foundBook) return null;

    return {
      id: foundBook.id,
      title: foundBook.title,
      isAvailable: foundBook.isAvailable,
      createdAt: foundBook.createdAt,
      updatedAt: foundBook.updatedAt,
    }
  }
}