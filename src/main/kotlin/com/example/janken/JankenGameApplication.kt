package com.example.janken

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class JankenGameApplication

fun main(args: Array<String>) {
	runApplication<JankenGameApplication>(*args)
}
