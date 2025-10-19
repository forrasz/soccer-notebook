package com.soccer.notebook.presentation

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.time.OffsetDateTime
import java.util.UUID

data class User(
    val id: String,
    val name: String,
    val email: String
)

data class UserCreateRequest(
    val name: String,
    val email: String
)

@RestController
@RequestMapping("/users")
class UsersController {

    // ダミーデータストレージ
    private val users = mutableListOf(
        User(
            id = "user-001",
            name = "田中太郎",
            email = "tanaka@example.com"
        ),
        User(
            id = "user-002",
            name = "佐藤花子",
            email = "sato@example.com"
        ),
        User(
            id = "user-003",
            name = "鈴木一郎",
            email = "suzuki@example.com"
        )
    )

    @GetMapping
    fun getUsers(): List<User> {
        return users
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createUser(@RequestBody request: UserCreateRequest): User {
        val newUser = User(
            id = "user-${UUID.randomUUID().toString().substring(0, 8)}",
            name = request.name,
            email = request.email
        )
        users.add(newUser)
        return newUser
    }
} 