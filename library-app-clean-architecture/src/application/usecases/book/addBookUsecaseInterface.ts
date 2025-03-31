import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "@/application/dtos/book/addBookResponseDto";

export interface AddBookUseCaseInterface {
  execute(request: AddBookRequestDto): Promise<AddBookResponseDto>;
}