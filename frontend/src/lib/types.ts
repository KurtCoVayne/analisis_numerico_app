import { z } from "zod";

const SymbolicRootsParams = z.object({ expression: z.string() }).passthrough();
const ValidationError = z
    .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
    .passthrough();
const HTTPValidationError = z
    .object({ detail: z.array(ValidationError) })
    .partial()
    .passthrough();
const BisectionRootsParams = z
    .object({ expression: z.string(), a: z.number(), b: z.number(), tol: z.number(), niter: z.number().int() })
    .passthrough();

export const schemas = {
    SymbolicRootsParams,
    ValidationError,
    HTTPValidationError,
    BisectionRootsParams,
};