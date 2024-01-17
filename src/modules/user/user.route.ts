import { FastifyInstance } from "fastify";
import { createUserHandler, loginHandler } from "../user/user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/create',
        {
            schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref('createUserResponseSchema'),
                }
            }
        },
        createUserHandler
    )

    server.post(
        '/login',
        {
            schema: {
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema'),
                }
            }
        },
        loginHandler
    )
}

export default userRoutes