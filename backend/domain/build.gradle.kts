plugins {
    kotlin("jvm")
}

dependencies {
    // Kotlin標準ライブラリのみ
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    
    // テスト
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("io.mockk:mockk:1.13.8")
} 