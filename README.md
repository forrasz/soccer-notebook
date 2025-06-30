# サッカーノートアプリ

サッカーの一日の目標・振り返りを記録するためのノートアプリケーションです。

## 技術スタック

- **バックエンド**: Kotlin, Spring Boot, Jooq
- **フロントエンド**: React, TypeScript
- **データベース**: PostgreSQL 16  
- **API仕様**: OpenAPI (Swagger)
- **インフラ**: Docker, Nginx

## ディレクトリ構成

```
.
├── backend/         # Spring Boot (Kotlin) バックエンドAPI
├── frontend/        # React (TypeScript) フロントエンド
├── migration/       # DBマイグレーション用ファイル
├── openapi/         # OpenAPI仕様書
├── nginx/           # リバースプロキシ設定
└── docker-compose.yml
```

## クイックスタート

### 前提条件
- Docker
- Docker Compose

### 起動方法

1. リポジトリをクローン
2. 以下のコマンドで全サービスを起動

```bash
docker compose up --build
```

### アクセス先

- **フロントエンド**: http://localhost/
- **バックエンドAPI**: http://localhost/api/
- **OpenAPI仕様**: openapi/openapi.yaml

## 開発

### OpenAPI仕様の管理

OpenAPI仕様は複数のファイルに分割して管理されており、以下のディレクトリに配置されています：

- `openapi/paths/`: パス定義ファイル
- `openapi/components/schemas/`: スキーマ定義ファイル

#### 仕様ファイルの結合

分割されたファイルを単一の`openapi.yaml`に結合するには：

```bash
./gradlew :backend:bundleOpenApiSpec
```

> **Note**: このタスクはコード生成タスク（`:backend:openApiGenerate`）の前に自動実行されます。

### コード生成

#### バックエンド（Kotlin/Spring）

OpenAPI仕様からバックエンドのモデルコードを生成：

```bash
./gradlew :backend:openApiGenerate
```

生成されたコードは`backend/build/generated/openapi`に出力されます。

#### フロントエンド（React/TypeScript）

APIクライアントコードを生成：

```bash
cd frontend
openapi-generator-cli generate \
  -i ../openapi/openapi.yaml \
  -g typescript-fetch \
  -o src/generated
```

### OpenAPI Generator CLI のインストール（オプション）

グローバルインストールして使用する場合：

```bash
npm install -g @openapitools/openapi-generator-cli
```

使用例：
```bash
openapi-generator-cli generate \
  -i openapi/openapi.yaml \
  -g kotlin-spring \
  -o generated-code/kotlin-spring
``` 