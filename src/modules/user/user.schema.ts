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

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const loginResponseSchema = z.object({
    token: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginSchema = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
})