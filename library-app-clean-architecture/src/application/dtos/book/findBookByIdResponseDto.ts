// usecase が返すレスポンス

export interface FindBookByIdResponseDto {
  id: string;
  title: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}