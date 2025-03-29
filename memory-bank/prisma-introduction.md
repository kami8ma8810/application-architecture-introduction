# Prisma入門

## Prismaとは？
Prismaは、データベースを簡単に操作するためのツールです。普通のデータベース操作は難しい言葉や複雑な命令が必要ですが、Prismaを使うと日本語で「探す」「作る」「更新する」「削除する」というような簡単な命令で操作できます。

## 基本的な使い方

### 1. インストール
まず、プロジェクトにPrismaをインストールします：
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 2. 初期設定
Prismaの設定ファイルを作ります：
```bash
npx prisma init
```

### 3. スキーマの定義
`prisma/schema.prisma`というファイルに、データの形を定義します。

例えば、図書館アプリの場合：
```prisma
// データベースの設定
datasource db {
  provider = "postgresql" // PostgreSQLを使う場合
  url      = env("DATABASE_URL")
}

// Prisma Clientの設定
generator client {
  provider = "prisma-client-js"
}

// 本のモデル
model Book {
  id        Int      @id @default(autoincrement())
  title     String   // 本のタイトル
  author    String   // 著者
  available Boolean  @default(true) // 貸出可能かどうか
  createdAt DateTime @default(now()) // 登録日時
}
```

### 4. データベースの準備
スキーマをデータベースに反映します：
```bash
npx prisma migrate dev --name init
```

### 5. Prisma Clientの生成
```bash
npx prisma generate
```

### 6. 基本的な操作例

#### データを作成する（本を登録する）
```typescript
// 新しい本を登録
const newBook = await prisma.book.create({
  data: {
    title: "はらぺこあおむし",
    author: "エリック・カール"
  }
});
```

#### データを検索する（本を探す）
```typescript
// 全ての本を取得
const allBooks = await prisma.book.findMany();

// 特定の本を探す
const book = await prisma.book.findUnique({
  where: {
    id: 1
  }
});
```

#### データを更新する（本の情報を変更する）
```typescript
// 本の貸出状態を変更
const updatedBook = await prisma.book.update({
  where: {
    id: 1
  },
  data: {
    available: false
  }
});
```

#### データを削除する（本を削除する）
```typescript
// 本を削除
const deletedBook = await prisma.book.delete({
  where: {
    id: 1
  }
});
```

## 便利な機能

### 1. Prisma Studio
データベースの中身をブラウザで見られる便利なツール：
```bash
npx prisma studio
```

### 2. 自動補完
コードを書くときに、使える命令を自動で提案してくれます。

### 3. 型安全
間違った形式のデータを保存しようとすると、事前にエラーを教えてくれます。

## 注意点
1. データベースのURLは必ず環境変数（.envファイル）で管理しましょう
2. パスワードなどの重要な情報は、GitHubなどに公開しないように気をつけましょう
3. 大きな変更をする前は、必ずデータのバックアップを取りましょう

## 参考リンク
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [Prisma GitHub](https://github.com/prisma/prisma) 