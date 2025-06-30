# サッカーノートアプリ - フロントエンド

サッカーノートアプリのReact TypeScriptフロントエンドプロジェクトです。

## 技術スタック

- **React** 19.1.0
- **TypeScript** 4.9.5
- **Material UI** 7.1.0
- **React Router DOM** 7.6.1

## 開発環境セットアップ

### 前提条件
- Node.js (推奨バージョン: 16以上)
- npm

### 依存関係のインストール

```bash
npm install
```

## 利用可能なスクリプト

### `npm start`

開発モードでアプリケーションを起動します。
ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスして確認できます。

ファイルを編集すると自動でページがリロードされます。

### `npm test`

テストランナーをインタラクティブウォッチモードで実行します。

### `npm run build`

本番用にアプリケーションを`build`フォルダにビルドします。
React を本番モードで正しくバンドルし、最高のパフォーマンスのためにビルドを最適化します。

### `npm run bundle:openapi`

OpenAPI仕様ファイルをバンドルします。

## プロジェクト構造（リファクタリング後）

```
src/
├── components/              # 再利用可能なコンポーネント
│   ├── StarRating.tsx      # 星評価コンポーネント
│   ├── TextFieldList.tsx   # テキストフィールドリストコンポーネント
│   ├── ThemeSection.tsx    # テーマセクションコンポーネント
│   ├── RecordSection.tsx   # 試合結果セクションコンポーネント
│   └── SoccerFieldCanvas.tsx # サッカーフィールドキャンバスコンポーネント
├── pages/                  # ページコンポーネント
│   ├── Login.tsx          # ログインページ
│   ├── Register.tsx       # ユーザー登録ページ
│   ├── NoteList.tsx       # ノート一覧ページ
│   ├── NoteDetail.tsx     # ノート詳細ページ
│   └── NoteEdit.tsx       # ノート編集ページ
├── hooks/                  # カスタムフック
│   ├── useNoteForm.ts     # ノートフォーム管理フック
│   └── useSoccerField.ts  # サッカーフィールドキャンバス管理フック
├── types/                  # 型定義
│   └── index.ts           # 共通型定義
├── constants/              # 定数
│   └── index.ts           # アプリケーション定数
├── utils/                  # ユーティリティ関数
│   ├── index.ts           # 共通ユーティリティ
│   └── canvasUtils.ts     # キャンバス描画ユーティリティ
├── App.tsx                # メインアプリケーションコンポーネント
└── index.tsx              # エントリーポイント
```

## リファクタリングによる改善点

### 1. **ディレクトリ構造の整理**
- `types/` - 型定義を一元管理
- `hooks/` - カスタムフックの分離
- `constants/` - 定数の集約
- `utils/` - ユーティリティ関数の整理

### 2. **コンポーネントの分割とモジュール化**
- 大きなコンポーネント（NoteEdit: 278行 → 110行）を小さな再利用可能なコンポーネントに分割
- StarRating、TextFieldList、ThemeSection、RecordSectionを独立したコンポーネントとして分離
- SoccerFieldCanvas（270行 → 110行）の描画ロジックを分離

### 3. **カスタムフックによる状態管理**
- `useNoteForm` - フォーム状態管理ロジックの分離
- `useSoccerField` - キャンバス操作ロジックの分離

### 4. **型安全性の向上**
- すべての型定義を `types/index.ts` に集約
- Props型の明確な定義

### 5. **保守性の向上**
- 責任の分離によりテストしやすい構造
- 再利用可能なコンポーネント設計
- 定数とユーティリティの分離による変更への対応力向上

## 主な機能

- ユーザー認証（ログイン・登録）
- サッカーノートの作成・編集・削除
- ノート一覧の表示・検索・フィルタリング
- 星評価システム
- サッカーフィールド図での戦術描画
- 動的フォーム要素（テーマ、試合記録、振り返り項目）

## 今後の拡張予定

- API連携の実装
- 認証システムの実装
- データ永続化
- レスポンシブデザインの改善
- PWA対応

## Docker での実行

プロジェクトルートで以下のコマンドを実行してください：

```bash
docker compose up --build
```

フロントエンドは [http://localhost/](http://localhost/) でアクセスできます。

## API連携

バックエンドAPIとの連携は、OpenAPI Generatorで自動生成されたクライアントコードを使用します。

詳細はプロジェクトルートの`README.md`を参照してください。
