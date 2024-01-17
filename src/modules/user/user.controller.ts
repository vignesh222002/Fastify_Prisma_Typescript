import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, getAllUsers } from "../user/user.service";
import { CreateUserInput, LoginSchema } from "../user/user.schema";
import { server } from "../../..";

export async function createUserHandler(
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

export async function loginHandler(
    request: FastifyRequest<{
        Body: LoginSchema
    }>,
    reply: FastifyReply
) {
    const { email, password } = request.body

    // Find the user by email and password
    const user = await findUserByEmail(email, password);

    if (user) {
        const { id, ...rest } = user;
        // Generate Token
        return {
            token: server.jwt.sign(rest)
        }
    }
    else {
        console.log("Not User")
        return reply.code(401).send({
            message: "Invalid Email or Password"
        })
    }
}

export async function getUsersHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const users = await getAllUsers();
    return users;
}