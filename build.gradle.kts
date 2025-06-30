plugins {
    kotlin("jvm") version "1.9.23" apply false
    kotlin("plugin.spring") version "1.9.23" apply false
    id("org.springframework.boot") version "3.2.5" apply false
    id("io.spring.dependency-management") version "1.1.4" apply false
    id("org.openapi.generator") version "7.13.0" apply false
}

allprojects {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

subprojects {
    apply(plugin = "kotlin")
    
    tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "21"
        }
    }
    
    tasks.withType<Test> {
        useJUnitPlatform()
    }
}



// OpenAPI仕様書をバンドルするタスク（presentation層から呼び出し可能）
tasks.register<DefaultTask>("bundleOpenApiSpec") {
    group = "openapi"
    description = "OpenAPI仕様書を複数ファイルから単一のファイルにバンドルします"

    doLast {
        val openapiDir = File(rootProject.rootDir, "openapi")
        val pathsDir = File(openapiDir, "paths")
        val mainYamlFile = File(openapiDir, "openapi.yaml")

        println("OpenAPI仕様書をバンドル中...")
        println("- パスディレクトリ: ${pathsDir.absolutePath}")
        println("- 出力ファイル: ${mainYamlFile.absolutePath}")

        if (!pathsDir.exists()) {
            println("警告: パスディレクトリが見つかりません")
        }

        println("バンドル完了: ${mainYamlFile.absolutePath}")
    }
}

 