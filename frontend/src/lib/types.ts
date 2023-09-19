import { z } from 'zod';

export const SymbolicRootsParams = z.object({ expression: z.string() });
export const SymbolicRoots = z.object({
	expression: z.string(),
	roots: z.string(),
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
	tol: z.coerce.number(),
	niter: z.coerce.number().int(),
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
	tol: z.coerce.number(),
	niter: z.coerce.number().int(),
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
