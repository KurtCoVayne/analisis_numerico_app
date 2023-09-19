import { z } from "zod"

export const SymbolicRootsParams = z.object({ expression: z.string() })
export const SymbolicRoots = z.object({ expression: z.string(), roots: z.string() })
export const ValidationError = z
    .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
    
export const HTTPValidationError = z
    .object({ detail: z.array(ValidationError) })
    .partial()
    
export const BisectionRootsParams = z
    .object({ expression: z.string(), a: z.number(), b: z.number(), tol: z.number(), niter: z.number().int() })
    
export const BisectionIteration = z
    .object({
        iteration: z.number().int(),
        a: z.number(),
        b: z.number(),
        xm: z.number(),
        f_xm: z.number(),
        error: z.number(),
    })
    
export const BisectionRoots = z
    .object({ expression: z.string(), root: z.number(), table: z.array(BisectionIteration) })
    
export const NewtonRootsParams = z
    .object({ expression: z.string(), x0: z.number(), tol: z.number(), niter: z.number().int() })
    
export const NewtonIteration = z
    .object({ iteration: z.number().int(), x: z.number(), f_x: z.number(), f_prime_x: z.number(), error: z.number() })
    
export const NewtonRoots = z
    .object({ expression: z.string(), derivative: z.string(), root: z.number(), table: z.array(NewtonIteration) })
    