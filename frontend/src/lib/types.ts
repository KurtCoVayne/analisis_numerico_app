import { z } from 'zod';

export const SymbolicRootsParams = z.object({ expression: z.string() });
export const SymbolicRoots = z.object({
	expression: z.string(),
	roots: z.string(),
});
export const MethodError = z.object({
	detail: z.string(),
	error: z.union([z.string(), z.null()]).optional(),
});
export const ValidationError = z.object({
	loc: z.array(z.union([z.string(), z.number()])),
	msg: z.string(),
	type: z.string(),
});
export const HTTPValidationError = z
	.object({ detail: z.array(ValidationError) })
	.partial();
export const ErrorType = z.enum(['absolute', 'relative']);
export const BisectionRootsParams = z.object({
	expression: z.string(),
	error_type: ErrorType.optional().default('absolute'),
	a: z.coerce.number(),
	b: z.coerce.number(),
	tol: z.coerce.number().gt(1e-21).lte(1),
	niter: z.coerce.number().int().gt(0).lte(100),
});
export const BisectionIteration = z.object({
	iteration: z.number().int(),
	a: z.coerce.number(),
	b: z.coerce.number(),
	xm: z.coerce.number(),
	f_xm: z.coerce.number(),
	error: z.coerce.number(),
});
export const BisectionRoots = z.object({
	expression: z.string(),
	root: z.number(),
	table: z.array(BisectionIteration),
});
export const NewtonRootsParams = z.object({
	expression: z.string(),
	error_type: ErrorType.optional().default('absolute'),
	x0: z.coerce.number(),
	tol: z.coerce.number().gt(1e-21).lte(1),
	niter: z.coerce.number().int().gt(0).lte(20),
});
export const NewtonIteration = z.object({
	iteration: z.number().int(),
	x: z.number(),
	f_x: z.number(),
	f_prime_x: z.number(),
	error: z.number(),
});
export const NewtonRoots = z.object({
	expression: z.string(),
	derivative: z.string(),
	root: z.number(),
	table: z.array(NewtonIteration),
});

export type SymbolicRootsParamsType = z.infer<typeof SymbolicRootsParams>;
export type SymbolicRootsType = z.infer<typeof SymbolicRoots>;
export type MethodErrorType = z.infer<typeof MethodError>;
export type ValidationErrorType = z.infer<typeof ValidationError>;
export type HTTPValidationErrorType = z.infer<typeof HTTPValidationError>;
export type ErrorTypeType = z.infer<typeof ErrorType>;
export type BisectionRootsParamsType = z.infer<typeof BisectionRootsParams>;
export type BisectionIterationType = z.infer<typeof BisectionIteration>;
export type BisectionRootsType = z.infer<typeof BisectionRoots>;
export type NewtonRootsParamsType = z.infer<typeof NewtonRootsParams>;
export type NewtonIterationType = z.infer<typeof NewtonIteration>;
export type NewtonRootsType = z.infer<typeof NewtonRoots>;
