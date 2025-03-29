# モジュール間の関係性

## 概要
モジュール間の関係性を適切に設計することは、アプリケーションの柔軟性と保守性を高める上で重要です。特に依存関係の管理が重要となります。

## 依存関係とは
- あるモジュールが別のモジュールの機能を利用し、その機能がないと動作できない状態
- 依存関係が複雑になると、アプリケーション全体の柔軟性が失われる
- 新機能の追加や既存機能の変更が困難になる
- バグ発生時の影響範囲が予測しづらくなる

## 依存関係の方向性

### 1. 一方向依存
- モジュールAがモジュールBに依存しているが、モジュールBはモジュールAに依存していない状態
- 変更の影響が局所的に抑えられる
- 最も望ましい関係性

### 2. 双方向依存
- 2つのモジュールが互いに依存し合う状態
- どちらか一方を変更すると他方に影響が及ぶ
- システムの柔軟性を損なうため、できる限り避けるべき

### 3. 循環依存
- 3つ以上のモジュールが相互に依存し合う状態
- 例：A → B → C → A
- アプリケーションの構造を複雑にする
- 修正や拡張を非常に困難にする
- 最も避けるべき関係性

## 結合度（Coupling）

### 定義
- モジュール間の依存の強さを表す指標
- 密結合：モジュール間の依存が強く、変更の影響が直接的
- 疎結合：モジュール間の依存が緩やかで、変更の影響が少ない

### 密結合の例
```typescript
class OrderProcessor {
  private database: MySQLDatabase;  // 具体的な実装に直接依存

  constructor() {
    this.database = new MySQLDatabase();  // 直接インスタンス化
  }

  public processOrder(order: Order): void {
    this.database.save(order);  // 具体的な実装に依存
  }
}
```

## 依存関係を適切に管理するためのテクニック

### 1. インターフェースの活用

#### 目的
インターフェースを利用することで、具体的な実装に依存せず、抽象化された構造に依存する設計になります。

#### 実装例と効果
```typescript
// インターフェースの定義
interface OrderRepository {
  save(order: Order): void;
}

// 具体的な実装
class MySQLDatabase implements OrderRepository {
  save(order: Order): void {
    // connect
    // beginTransaction
    // saveOrder
    // commit
  }
}

// インターフェースを利用する側
class OrderProcessor {
  private repository: OrderRepository;  // インターフェースに依存

  constructor() {
    this.repository = new MySQLDatabase();  // ここでは具体的な実装に依存している
  }

  processOrder(order: Order): void {
    this.repository.save(order);
  }
}
```

このコードでは、`OrderProcessor`が`MySQLDatabase`の具体的な実装に直接依存しており、まだ改善の余地があります。

### 2. 依存性逆転の原則（Dependency Inversion Principle）

#### 原則の内容
1. 上位のモジュールは下位のモジュールに依存してはならない
2. どちらのモジュールも「抽象」に依存すべき
3. 抽象は実装の詳細に依存してはならない
4. 実装の詳細が抽象に依存すべき

#### 依存関係の図示
```
改善前:
OrderProcessor → MySQLDatabase
（上位モジュールが下位モジュールに直接依存）

改善後:
OrderProcessor → OrderRepository ← MySQLDatabase
（両者が抽象に依存）
```

#### 違反例
```typescript
class OrderProcessor {
  private repository: OrderRepository;

  constructor() {
    this.repository = new MySQLDatabase();  // 具体的な実装に依存
  }
}
```

### 3. 依存性注入（Dependency Injection）

#### 定義
クラスが必要とする依存オブジェクトを外部から注入する手法です。これにより、クラスが自身で依存オブジェクトを生成・管理する必要がなくなります。

#### 実装例
```typescript
class OrderProcessor {
  private repository: OrderRepository;

  constructor(repository: OrderRepository) {  // 依存オブジェクトを外部から注入
    this.repository = repository;
  }

  processOrder(order: Order): void {
    this.repository.save(order);
  }
}

// 使用例
function main() {
  const database = new MySQLDatabase();
  const orderProcessor = new OrderProcessor(database);  // 依存オブジェクトを注入
  // orderProcessorを使用した処理
}
```

#### メリット
1. 依存オブジェクトの差し替えが容易
2. テスト時にモックの利用が容易
3. 柔軟な設計が可能

## まとめ
これら3つのテクニック（インターフェース、DIP、DI）を組み合わせることで：

1. 具体的な実装への依存を避け、抽象に依存する設計が可能
2. モジュール間の結合度を下げ、柔軟性を向上
3. テストがしやすく、保守性の高いコードを実現

これらの原則を適切に適用することで、保守性が高く、拡張しやすいソフトウェアを設計することができます。 