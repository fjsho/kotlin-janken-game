package com.example.janken.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/janken")
class JankenController {
    @PostMapping("/play")
    fun play(@RequestBody request: JankenRequest): JankenResponse {
        val computerHand = listOf("グー", "チョキ", "パー").random() // todo JankenHandを使う
        val result = judgeResult(request.userHand, computerHand)
        return JankenResponse(request.userHand, computerHand, result)
    }

    private fun judgeResult(userHand: String, computerHand: String): String {
        return when {
            userHand == computerHand -> "引き分け"
            (userHand == "グー" && computerHand == "チョキ") ||
                    (userHand == "チョキ" && computerHand == "パー") ||
                    (userHand == "パー" && computerHand == "グー") -> "勝ち"
            else -> "負け"
        }
    }
}