rootProject.name = "soccer-notebook"

// Backend層の構成（DDD + オニオンアーキテクチャー）
include("backend:domain")
include("backend:application")
include("backend:infrastructure")
include("backend:presentation")
include("backend:shared")

include("frontend") // frontend モジュールも追加する場合 