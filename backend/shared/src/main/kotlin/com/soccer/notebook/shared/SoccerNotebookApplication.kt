package com.soccer.notebook.shared

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = [
    "com.soccer.notebook.domain",
    "com.soccer.notebook.application", 
    "com.soccer.notebook.infrastructure",
    "com.soccer.notebook.presentation",
    "com.soccer.notebook.shared"
])
class SoccerNotebookApplication

fun main(args: Array<String>) {
    runApplication<SoccerNotebookApplication>(*args)
} 