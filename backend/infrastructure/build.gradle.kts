plugins {
    kotlin("jvm")
    id("io.spring.dependency-management")
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.boot:spring-boot-dependencies:3.2.5")
    }
}

dependencies {
    // Domain and Application layers
    implementation(project(":backend:domain"))
    implementation(project(":backend:application"))

    // Kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    // Spring Framework
    implementation("org.springframework:spring-context:6.1.6")
    implementation("org.springframework:spring-web:6.1.6")
    implementation("org.springframework:spring-webmvc:6.1.6")

    // Database (Jooq for future use)
    // implementation("org.springframework.boot:spring-boot-starter-jooq")
    // implementation("org.postgresql:postgresql")

    // テスト
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("io.mockk:mockk:1.13.8")
    testImplementation("org.springframework:spring-test:6.1.6")
}
