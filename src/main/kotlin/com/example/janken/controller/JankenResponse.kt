package com.example.janken.controller

data class JankenResponse(
    val userHand: String,
    val computerHand: String,
    val result: String
)
