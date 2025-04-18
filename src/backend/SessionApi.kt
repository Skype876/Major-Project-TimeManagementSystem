import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*

data class UserSession(val studentId: String)

fun Route.sessionApi() {
    get("/api/current-student") {
        val session = call.sessions.get<UserSession>()
        if (session != null) {
            call.respond(mapOf("studentId" to session.studentId))
        } else {
            call.respond(mapOf("error" to "No active session"))
        }
    }
}
