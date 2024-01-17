import { FastifyInstance } from "fastify";
import createUserHandler from "../product/product.controller";
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
        createUserHandler)
}

export default userRoutes