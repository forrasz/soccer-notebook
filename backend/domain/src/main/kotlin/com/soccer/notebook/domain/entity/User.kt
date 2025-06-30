package com.soccer.notebook.domain.entity

/**
 * ユーザーエンティティ
 * ドメインオブジェクトとして純粋なビジネスロジックを表現
 */
data class User(
    val id: UserId,
    val name: UserName,
    val email: Email
) {
    companion object {
        fun create(name: String, email: String): User {
            return User(
                id = UserId.generate(),
                name = UserName.of(name),
                email = Email.of(email)
            )
        }
    }
}

/**
 * ユーザーID値オブジェクト
 */
@JvmInline
value class UserId(val value: String) {
    companion object {
        fun generate(): UserId = UserId("user-${java.util.UUID.randomUUID().toString().substring(0, 8)}")
        fun of(value: String): UserId = UserId(value)
    }
}

/**
 * ユーザー名値オブジェクト
 */
@JvmInline
value class UserName(val value: String) {
    init {
        require(value.isNotBlank()) { "ユーザー名は空であってはいけません" }
        require(value.length <= 50) { "ユーザー名は50文字以下である必要があります" }
    }
    
    companion object {
        fun of(value: String): UserName = UserName(value)
    }
}

/**
 * メールアドレス値オブジェクト
 */
@JvmInline
value class Email(val value: String) {
    init {
        require(value.isNotBlank()) { "メールアドレスは空であってはいけません" }
        require(value.contains("@")) { "有効なメールアドレス形式である必要があります" }
    }
    
    companion object {
        fun of(value: String): Email = Email(value)
    }
} 