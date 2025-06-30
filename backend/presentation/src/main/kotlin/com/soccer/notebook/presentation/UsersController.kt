package com.soccer.notebook.presentation.controller

import com.soccer.notebook.presentation.api.UsersApi
import com.soccer.notebook.presentation.model.User
import com.soccer.notebook.presentation.model.UserCreateRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID

@RestController
class UsersController : UsersApi {
    
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

    override fun usersGet(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(users)
    }

    override fun usersPost(userCreateRequest: UserCreateRequest): ResponseEntity<Unit> {
        val newUser = User(
            id = "user-${UUID.randomUUID().toString().substring(0, 8)}",
            name = userCreateRequest.name,
            email = userCreateRequest.email
        )
        users.add(newUser)
        
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }
} 