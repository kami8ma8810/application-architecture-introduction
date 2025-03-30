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

  // set などではなく、直感的にわかりやすい変数名にする
  // 貸出
  loan(): void {
    if(!this._isAvailable) {
      throw new Error('この本は既に貸し出しされています');
    }
    this._isAvailable = false;
  }

  // 返却
  return(): void {
    if(this._isAvailable) {
      throw new Error('この本は既に返却されています');
    }
    this._isAvailable = true;
  }
}