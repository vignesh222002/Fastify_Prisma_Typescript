import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "../user/user.service";
import { CreateUserInput } from "../user/user.schema";

async function createUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body);

        return reply.code(201).send(user)
    }
    catch (error) {
        console.log("Create User Error", error)
        reply.code(500).send(error)
    }
}

export default createUserHandler;