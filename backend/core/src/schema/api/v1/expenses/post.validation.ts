import { z } from "zod";

export const bodyValidation = z
    .object({
        payerId: z.number().int().positive(),
        payeeId: z.number().int().positive(),
        amount: z.number().int().positive(),
        description: z.string().trim().min(1).max(500),
    })
    .refine((body) => body.payerId !== body.payeeId, {
        message: "Paid by and expense for must be different people",
        path: ["payeeId"],
    });
