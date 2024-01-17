import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod"
import userRoutes from "./src/modules/user/user.route";
import { userSchemas } from "./src/modules/user/user.schema";

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
    {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
        exposeRoute: true,
        routePrefix: '/docs',
    }
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