import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import swaggerConfig from "./swaggerConfig";
import cors from '@fastify/cors'
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

// Cors

server.register(cors, {
    origin: "*",
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
});

// Swagger

server.register(swagger, swaggerConfig);
server.register(swaggerUi);

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

// Start Server

try {
    server.listen({ port: PORT }, (err, address) => {
        if (err) {
            console.log(err);
        }
    })
}
catch (error) {
    server.log.error(error)
    process.exit(1)
}