FROM openjdk:17-jdk-slim as builder
WORKDIR /build

# Copy Gradle files
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Copy OpenAPI specs (required for code generation)
COPY openapi openapi

# Copy backend source
COPY backend backend

# Build the application
RUN chmod +x gradlew && ./gradlew :backend:shared:bootJar -x test

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar from builder stage
COPY --from=builder /build/backend/shared/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 