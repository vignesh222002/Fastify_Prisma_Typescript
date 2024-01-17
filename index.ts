import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod"
import userRoutes from "./src/modules/user/user.route";
import { userSchemas } from "./src/modules/user/user.schema";
import { version } from "./package.json";

const PORT = 4000;

export const server = Fastify();

// Add the authenticate type in the Fastify Instance Globally

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

// Checking API

server.get('/check', async (request, reply) => {
    return { status: "Ok" }
})

// Fastify JWT

server.register(fjwt, {
    secret: "qwertyuiopasdfghjklzxcvbnm1234567890"
})

// Swagger Plugin

server.register(
    swagger,
    withRefResolver({
        routerPrefix: '/docs',
        exposeRoute: true,
        staticsCSP: true,
        openapi: {
            info: {
                title: 'Fastify API',
                description: 'API for some Users',
                version,
            }
        }
    })
)

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