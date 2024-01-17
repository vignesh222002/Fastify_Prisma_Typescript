import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
    const user = await prisma.user.create({
        data: input,
    })

    return user;
}

export async function findUserByEmail(email: string, password: string) {
    return prisma.user.findUnique({
        where: {
            email,
            password,
        }
    })
}