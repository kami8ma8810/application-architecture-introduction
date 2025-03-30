import { Request, Response } from "express";
import { BookServiceInterface } from "../businessLogic/bookServiceInterface";

export class BookController {
  

  constructor(private readonly bookService: BookServiceInterface) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;
      const book = await this.bookService.add(title);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: "書籍の登録に失敗しました" });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const book = await this.bookService.findById(id);
      if (!book) {
        res.status(404).json({ error: "書籍が見つかりませんでした" });
        return;
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: "書籍の検索に失敗しました" });
    }
  }
}