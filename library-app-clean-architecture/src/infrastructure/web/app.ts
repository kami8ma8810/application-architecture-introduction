import express from 'express';
import { BookController } from '@/adapter/controllers/bookController';
import { PrismaBookRepository } from '@/adapter/repositories/prismaBookRepository';
import { AddBookUseCase } from '@/application/usecases/book/addBookUseCase';
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '@/adapter/utils/uuidGenerator';
import { bookRoutes } from '@/infrastructure/web/routers/bookRouter';
import { FindBookByIdUseCase } from '@/application/usecases/book/findBookByIdUseCase';

const app = express();

app.use(express.json());

// 外側から実行
const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

app.use('/books',bookRoutes(bookController));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
