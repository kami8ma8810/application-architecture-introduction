# モジュール設計の基礎

## 概要
モジュール設計は、アプリケーション開発においてコードを機能ごとに分割し、効率的な開発と保守を可能にする重要な概念です。

## モジュールとは
- プログラムを特定の機能や責任毎に分割した独立性の高い部品
- オブジェクト指向プログラミングでは、クラスやパッケージ、名前空間などが該当
- 単体で特定の機能を持ちながら、他のモジュールと連携してシステム全体を構築

## モジュール設計が重要な理由

### 1. 再利用性の向上
- 適切に設計されたモジュールは他のプロジェクトでも再利用可能
- 開発効率の向上

### 2. 保守性の向上
- モジュール化されたコードは他の部分への影響が少ない
- 変更やバグ修正が容易

### 3. 理解のしやすさ
- システムを小さな単位に分割することで全体の把握が容易
- 100行ずつの分割されたプログラムの方が理解しやすい

### 4. テストの容易さ
- モジュール単位でのテストが可能
- 品質確保とシステム全体の信頼性向上

## モジュール設計の重要なポイント

### 1. 単一責任の原則（Single Responsibility Principle）

#### 定義
- モジュールは一つのアクターに対してのみ責務を負うべき
- アクター：そのモジュールを利用するユーザーやステークホルダー

#### 注意点
- モジュールが一つのことだけを行うという意味ではない
- 責務を負う対象を一つにするという原則

#### 違反例
```typescript
class Employee {
  // 経理部門、人事部門、IT部門の3つのアクターに責務を持つ
  public calculateSalary(): number {
    // 給与計算ロジック
  }

  public reportHours(): void {
    // 労働時間レポート
  }

  public save(): void {
    // データベース保存
  }

  private getRegularHours(): number {
    // 共通の労働時間計算ロジック
  }
}
```

#### 適切な設計例
```typescript
// データのみを保持するクラス
class EmployeeData {
  public id: string;
  public name: string;
  // その他のデータ
}

// 経理部門向けの責務
class SalaryCalculator {
  public calculateSalary(employee: EmployeeData): number {
    // 給与計算ロジック
  }

  private getRegularHours(employee: EmployeeData): number {
    // 経理部門用の労働時間計算
  }
}

// 人事部門向けの責務
class HRReporter {
  public reportHours(employee: EmployeeData): void {
    // 労働時間レポート
  }

  private getRegularHours(employee: EmployeeData): number {
    // 人事部門用の労働時間計算
  }
}
```

### 2. 凝集性（Cohesion）

#### 定義
- モジュール内部の機能がどれだけ密接に関連しているかを示す指標
- 高凝集：モジュール内の機能が強く関連し、単一の目的に集中
- 低凝集：関連性のない機能が混在

#### 高凝集の例
```typescript
class UserAuthentication {
  public login(username: string, password: string): void {
    // ログイン処理
  }

  public logout(): void {
    // ログアウト処理
  }

  public resetPassword(email: string): void {
    // パスワードリセット処理
  }
}
```

#### 低凝集の例
```typescript
class Utility {
  public calculateTax(amount: number): number {
    // 税金計算
  }

  public formatDate(date: Date): string {
    // 日付フォーマット
  }

  public sendEmail(to: string, subject: string): void {
    // メール送信
  }
}
```

#### 凝集性の確認方法
- モジュールに適切な名前が付けられるかを考える
- 高凝集：明確なモジュール名が付けられる
- 低凝集：ユーティリティなど抽象的な名前しか付けられない

### 3. 関心の分離（Separation of Concerns）

#### 定義
- 各機能や役割に関連するコードを独立したモジュールに分ける考え方
- 一つの関心ごとに特化させることで変更の影響範囲を最小化

#### 典型的な関心事の例（Webアプリケーション）
1. UI（画面やフォームの操作）
2. ビジネスロジック（アプリケーションの主要な機能やルール）
3. データアクセス（データベースとのやり取り）

#### 関心の分離ができていない例
```typescript
class OrderProcessor {
  // UIとビジネスロジックの混在
  public calculateTotal(): number {
    // 金額計算ロジック
  }

  public updateUI(): void {
    // UIの更新処理
  }
}

class UserRepository {
  // データアクセスとビジネスロジックの混在
  public saveUser(user: User): void {
    // データの保存
  }

  public validateUser(user: User): boolean {
    // データのバリデーション（ビジネスロジック）
  }
}
```

## まとめ
モジュール設計の3つの重要なポイント：

1. 単一責任の原則：一つのアクターに対してのみ責務を持つ
2. 凝集性：関連する機能をまとめ、高凝集なモジュールを目指す
3. 関心の分離：異なる役割や処理を独立したモジュールに分割

これらの原則を適切に適用することで、保守性が高く、理解しやすいソフトウェアを設計することができます。 