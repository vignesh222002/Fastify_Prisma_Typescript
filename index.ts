import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import userRoutes from "./src/modules/user/user.route";
import { userSchemas } from "./src/modules/user/user.schema";

const PORT = 4000;

export const server = Fastify();

// Checking API

server.get('/check', async (request, reply) => {
    return { status: "Ok" }
})

// Fastify JWT

server.register(fjwt, {
    secret: "qwertyuiopasdfghjklzxcvbnm1234567890"
})

server.decorate('authenticate', 
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            return reply.code(500).send(error)
        }
    }
)

// Schemas

for (const schema of userSchemas) {
    server.addSchema(schema);
}

// Routes

server.register(userRoutes, { prefix: 'api/users' });
// server.register(() => { }, { prefix: 'api/products' });

// Start Server

try {
    server.listen({ port: PORT })
}
catch (error) {
    server.log.error(error)
    process.exit(1)
}