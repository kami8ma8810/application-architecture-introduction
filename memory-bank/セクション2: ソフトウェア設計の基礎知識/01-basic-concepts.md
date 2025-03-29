# ソフトウェア設計の基本概念

## 概要
ソフトウェア設計の基盤を形成する3つの重要な概念について説明します。

## 1. カプセル化（Encapsulation）

### 定義
- オブジェクト指向プログラミングの基本原則の一つ
- データ構造と操作をオブジェクトにまとめ、内部状態を外部から直接アクセスできないように隠蔽する考え方

### 目的
- 内部状態の保護
- バグや予期しない動作の防止
- コード変更時の影響範囲の軽減

### 実装例
```typescript
class User {
  private name: string;  // プライベートプロパティ

  public setName(newName: string): void {
    this.name = newName;
  }

  public getName(): string {
    return this.name;
  }
}
```

### メリット
- データの整合性が保証される
- 変更の影響範囲が限定される
- インターフェースが明確になる

## 2. 抽象化（Abstraction）

### 定義
- 本質的な要素や共通の振る舞いを抽出し、不要な詳細を排除するプロセス
- 複雑なシステムを理解しやすく、管理しやすい形で表現する手段

### 目的
- システムの詳細の隠蔽
- 重要な機能や動作への集中
- コードの再利用性の向上
- システム全体像の把握の容易化

### 実装例
```typescript
abstract class Employee {
  protected employeeId: string;
  
  abstract recordAttendance(): void;
}

class Engineer extends Employee {
  public recordAttendance(): void {
    // エンジニア固有の勤怠記録処理
  }
}

class SalesPerson extends Employee {
  public recordAttendance(): void {
    // 営業担当固有の勤怠記録処理
  }
}
```

### メリット
- コードの再利用性が向上する
- システムの複雑さが軽減される
- 保守性が向上する

## 3. インターフェース（Interface）

### 定義
- クラスが実装すべきメソッドのセットを定義する契約
- 実装の詳細を隠蔽し、共通の振る舞いに焦点を当てる

### 目的
- メソッド実装の強制
- 実装の詳細の隠蔽
- 依存関係の削減
- システムの柔軟性向上

### 実装例
```typescript
interface Vehicle {
  start(): void;
  stop(): void;
  getSpeed(): number;
}

class Car implements Vehicle {
  public start(): void {
    // 車の起動処理
  }

  public stop(): void {
    // 車の停止処理
  }

  public getSpeed(): number {
    return this.currentSpeed;
  }
}

class Airplane implements Vehicle {
  public start(): void {
    // 飛行機の起動処理
  }

  public stop(): void {
    // 飛行機の停止処理
  }

  public getSpeed(): number {
    return this.airspeed;
  }
}
```

### メリット
- 実装の標準化が可能
- 依存関係が低減される
- テストが容易になる
- 拡張性が向上する

## まとめ
これらの3つの概念は互いに関連しており、ソフトウェア設計の基盤を形成する重要な要素です。

### 設計時の考慮点
1. カプセル化：内部状態の保護と変更の影響範囲の制御
2. 抽象化：複雑なシステムの単純化と再利用性の向上
3. インターフェース：実装の標準化と柔軟性の確保

これらの概念を適切に組み合わせることで、保守性が高く、拡張しやすいソフトウェアを設計することができます。 