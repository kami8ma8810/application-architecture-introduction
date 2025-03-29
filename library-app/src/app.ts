import express from 'express';
import { BookController } from './presentation/bookController';

const app = express();

app.use(express.json());

const bookController = new BookController();

const PORT = process.env.PORT || 3030;

app.post('/books', bookController.add.bind(bookController)); // bind を利用することで this が確実に bookController を参照するようにしている
app.get('/books/:id', bookController.findById.bind(bookController));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
