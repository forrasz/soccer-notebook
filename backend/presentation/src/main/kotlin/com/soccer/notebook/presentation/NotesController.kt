package com.soccer.notebook.presentation

import org.springframework.web.bind.annotation.*
import java.time.OffsetDateTime

data class Note(
    val id: String,
    val title: String,
    val content: String,
    val createdAt: OffsetDateTime
)

@RestController
@RequestMapping("/notes")
class NotesController {

    // ダミーデータストレージ
    private val notes = mutableListOf(
        Note(
            id = "note-001",
            title = "FC東京 vs 横浜F・マリノス",
            content = "4-3-3フォーメーションで攻撃的な戦術を採用。前半は守備が安定していたが、後半にカウンターアタックでピンチを迎えた。",
            createdAt = OffsetDateTime.parse("2024-06-01T15:30:00+09:00")
        ),
        Note(
            id = "note-002",
            title = "鹿島アントラーズ戦の分析",
            content = "相手のプレッシングが激しく、中盤でのボール保持が難しかった。サイドバックの攻撃参加が効果的だった。",
            createdAt = OffsetDateTime.parse("2024-06-05T19:15:00+09:00")
        ),
        Note(
            id = "note-003",
            title = "セットプレーの改善点",
            content = "コーナーキックからの得点機会を増やす必要がある。ディフェンダーの競り合いでの強さを向上させたい。",
            createdAt = OffsetDateTime.parse("2024-06-10T10:00:00+09:00")
        ),
        Note(
            id = "note-004",
            title = "新戦術の検討",
            content = "3-5-2フォーメーションの導入を検討。ウイングバックの役割が重要になる。守備時の連携も重要。",
            createdAt = OffsetDateTime.parse("2024-06-15T14:20:00+09:00")
        ),
        Note(
            id = "note-005",
            title = "選手個人の成長記録",
            content = "MFの田中選手のパス精度が向上している。FWの佐藤選手の決定力にも期待が持てる。",
            createdAt = OffsetDateTime.parse("2024-06-20T16:45:00+09:00")
        )
    )

    @GetMapping
    fun getNotes(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "30") limit: Int
    ): List<Note> {
        val startIndex = page * limit
        val endIndex = minOf(startIndex + limit, notes.size)

        return if (startIndex < notes.size) {
            notes.subList(startIndex, endIndex)
        } else {
            emptyList()
        }
    }
} 