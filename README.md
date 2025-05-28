# サッカーノートアプリ

## 概要
サッカーの一日の目標・振り返りを記録するためのノートアプリです。

## ディレクトリ構成

- backend: Spring Boot (Kotlin) バックエンドAPI
- frontend: React (TypeScript) フロントエンド
- migration: DBマイグレーション用
- openapi: OpenAPI仕様書
- nginx: リバースプロキシ設定

## 起動方法

1. 必要なツール: Docker, Docker Compose
2. 以下のコマンドで全サービスを起動します。

```sh
docker compose up --build
```

- フロントエンド: http://localhost/
- バックエンドAPI: http://localhost/api/
- OpenAPI仕様: openapi/openapi.yaml

## 技術スタック
- バックエンド: Kotlin, Spring Boot, Jooq
- フロントエンド: React, TypeScript
- DB: PostgreSQL 16
- API仕様: OpenAPI (Swagger)
- インフラ: Docker, Nginx 