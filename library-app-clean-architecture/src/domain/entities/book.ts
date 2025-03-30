// エンティティはビジネスの核となる概念を表現し、業務のルールや制約をコードとして明確にするもの。

export class Book {
  constructor(
    private _id: string,
    private _title: string,
    private _isAvailable: boolean = true,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {}

  get id(): string {
    return this._id;
  } 

  get title(): string {
    return this._title;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}