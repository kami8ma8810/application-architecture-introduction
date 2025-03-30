import { AddBookRequestDto } from "@/application/dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "@/application/dtos/book/addBookResponseDto";

export interface AddBookUsecaseInterface {
  execute(request: AddBookRequestDto): Promise<AddBookResponseDto>;
}