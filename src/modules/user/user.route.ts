import { FastifyInstance } from "fastify";
import { createUserHandler, getUsersHandler, loginHandler } from "../user/user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/create',
        {
            schema: {
                tags: ['user'],
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
                tags: ['user'],
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema'),
                }
            }
        },
        loginHandler
    )

    server.get(
        '/all',
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ['user'],
                headers: {
                    type: 'object',
                    properties: {
                        authorization: { type: 'string' }
                    },
                    required: ['authorization'],
                }
            }
        },
        getUsersHandler
    )
}

export default userRoutes