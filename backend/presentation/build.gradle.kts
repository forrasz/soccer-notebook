plugins {
    kotlin("jvm")
    kotlin("plugin.spring")
    id("io.spring.dependency-management")
    id("org.openapi.generator")
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.boot:spring-boot-dependencies:3.2.5")
    }
}

dependencies {
    // Application layer
    implementation(project(":backend:application"))
    implementation(project(":backend:domain"))

    // Kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // Spring Boot Web
    implementation("org.springframework.boot:spring-boot-starter-web")

    // OpenAPI/Swagger
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")
    implementation("io.swagger.core.v3:swagger-annotations:2.2.21")

    // テスト
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
}

// OpenAPI Generator configuration
openApiGenerate {
    generatorName.set("kotlin-spring")
    inputSpec.set("$rootDir/openapi/openapi.yaml")
    outputDir.set("$buildDir/generated/openapi")
    apiPackage.set("com.soccer.notebook.presentation.api")
    modelPackage.set("com.soccer.notebook.presentation.model")
    skipValidateSpec.set(true) // Skip validation for now
    configOptions.set(
        mapOf(
            "dateLibrary" to "java8",
            "interfaceOnly" to "true",
            "useTags" to "true",
            "useSpringBoot3" to "true"
        )
    )
}

// Add generated sources to source sets
sourceSets {
    main {
        kotlin {
            srcDir("$buildDir/generated/openapi/src/main/kotlin")
        }
    }
}

// Temporarily disable OpenAPI code generation
// Make compileKotlin depend on openApiGenerate
// tasks.named("compileKotlin") {
//     dependsOn("openApiGenerate")
// }
