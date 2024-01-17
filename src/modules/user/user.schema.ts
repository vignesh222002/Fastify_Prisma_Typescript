import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const createUserResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
})