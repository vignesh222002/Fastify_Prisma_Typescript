import Fastify from "fastify";
import userRoutes from "./src/modules/user/user.route";
import { userSchemas } from "./src/modules/user/user.schema";

const PORT = 4000;

export const server = Fastify();

// Checking API

server.get('/check', async (request, reply) => {
    return { status: "Ok" }
})

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