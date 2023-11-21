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
	loc: z.array(z.union([z.string(), z.coerce.number()])),
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
	iteration: z.coerce.number().int(),
	a: z.coerce.number(),
	b: z.coerce.number(),
	xm: z.coerce.number(),
	f_xm: z.coerce.number(),
	error: z.coerce.number(),
});
export const BisectionRoots = z.object({
	expression: z.string(),
	root: z.coerce.number(),
	table: z.array(BisectionIteration),
});

export const NewtonRootsParams = z
	.object({
		expression: z.string(),
		error_type: ErrorType.optional().default("absolute"),
		multiple_roots: z.coerce.boolean().optional(),
		x0: z.coerce.number(),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const NewtonIteration = z
	.object({ iteration: z.coerce.number().int(), x: z.coerce.number(), f_x: z.coerce.number(), f_prime_x: z.coerce.number(), error: z.coerce.number() })
	.passthrough();
export const NewtonRoots = z
	.object({ expression: z.string(), derivative: z.string(), root: z.coerce.number(), table: z.array(NewtonIteration) })
	.passthrough();
export const FixedPointParams = z
	.object({
		f_expr: z.string(),
		g_expr: z.string(),
		x0: z.coerce.number(),
		error_type: ErrorType.optional().default("absolute"),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const FixedPointIteration = z
	.object({ x: z.coerce.number(), g_x: z.coerce.number(), f_x: z.coerce.number(), error: z.coerce.number() })
	.passthrough();
export const FixedPointRoots = z
	.object({ f_expr: z.string(), g_expr: z.string(), root: z.coerce.number(), table: z.array(FixedPointIteration) })
	.passthrough();
export const FalseRuleParams = z
	.object({
		f_expr: z.string(),
		xl: z.coerce.number(),
		xu: z.coerce.number(),
		error_type: ErrorType.optional().default("absolute"),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const FalseRuleIteration = z
	.object({ xl: z.coerce.number(), xm: z.coerce.number(), xu: z.coerce.number(), f_x: z.coerce.number(), error: z.coerce.number() })
	.passthrough();
export const FalseRuleRoots = z
	.object({ f_expr: z.string(), root: z.coerce.number(), table: z.array(FalseRuleIteration) })
	.passthrough();
export const SecanteParams = z
	.object({
		f_expr: z.string(),
		x0: z.coerce.number(),
		x1: z.coerce.number(),
		error_type: ErrorType.optional().default("absolute"),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const SecanteIteration = z.object({ xi: z.coerce.number(), f_x: z.coerce.number(), error: z.coerce.number() }).passthrough();
export const SecanteRoots = z.object({ f_expr: z.string(), root: z.coerce.number(), table: z.array(SecanteIteration) }).passthrough();
export const SplineType = z.enum(["linear", "quadratic", "cubic"]);
export const SplineParams = z
	.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()), d: SplineType.optional().default("linear") })
	.passthrough();
export const Spline_Input = z
	.object({
		x: z.array(z.coerce.number()),
		y: z.array(z.coerce.number()),
		d: SplineType.optional().default("linear"),
		coefficients: z.array(z.array(z.coerce.number())),
	})
	.passthrough();
export const VanderParams = z.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()) }).passthrough();
export const VanderInt = z
	.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()), coefficients: z.array(z.coerce.number()), pol: z.string() })
	.passthrough();
export const LagranParams = z.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()) }).passthrough();
export const LagranInt = z
	.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()), polys: z.array(z.string()), pol: z.string() })
	.passthrough();
export const NewtonParams = z.object({ x: z.array(z.coerce.number()), y: z.array(z.coerce.number()) }).passthrough();
export const NewtonInt = z
	.object({
		x: z.array(z.coerce.number()),
		y: z.array(z.coerce.number()),
		coefficients: z.array(z.array(z.coerce.number())),
		pol: z.string(),
	})
	.passthrough();
export const JacobiParams = z
	.object({
		matrix_a: z.array(z.array(z.coerce.number())),
		vector_b: z.array(z.coerce.number()),
		x0: z.array(z.coerce.number()),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const JacobiIteration = z.object({ step: z.coerce.number().int(), x: z.array(z.coerce.number()), error: z.coerce.number() }).passthrough();
export const JacobiResult = z
	.object({
		transition_matrix: z.array(z.array(z.coerce.number())),
		coefficient_matrix: z.array(z.array(z.coerce.number())),
		spectral_radius: z.coerce.number(),
		iterations: z.array(JacobiIteration),
		converges: z.coerce.boolean(),
	})
	.passthrough();
export const GaussSeidelParams = z
	.object({
		matrix_a: z.array(z.array(z.coerce.number())),
		vector_b: z.array(z.coerce.number()),
		x0: z.array(z.coerce.number()),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const GaussSeidelIteration = z
	.object({ step: z.coerce.number().int(), x: z.array(z.coerce.number()), error: z.coerce.number() })
	.passthrough();
export const GaussSeidelResult = z
	.object({
		transition_matrix: z.array(z.array(z.coerce.number())),
		coefficient_matrix: z.array(z.array(z.coerce.number())),
		spectral_radius: z.coerce.number(),
		iterations: z.array(GaussSeidelIteration),
		converges: z.coerce.boolean(),
	})
	.passthrough();
export const SORParams = z
	.object({
		matrix_a: z.array(z.array(z.coerce.number())),
		vector_b: z.array(z.coerce.number()),
		x0: z.array(z.coerce.number()),
		relaxation_factor: z.coerce.number().gt(0).lte(2),
		tol: z.coerce.number().gt(1e-21).lte(1),
		niter: z.coerce.number().int().gt(0).lte(100),
	})
	.passthrough();
export const SORIteration = z.object({ step: z.coerce.number().int(), x: z.array(z.coerce.number()), error: z.coerce.number() }).passthrough();
export const SORResult = z
	.object({
		solution: z.array(z.coerce.number()),
		transition_matrix: z.array(z.array(z.coerce.number())),
		coefficient_matrix: z.array(z.array(z.coerce.number())),
		spectral_radius: z.coerce.number(),
		iterations: z.array(SORIteration),
		converges: z.coerce.boolean(),
	})
	.passthrough();

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
export type FixedPointParamsType = z.infer<typeof FixedPointParams>;
export type FixedPointIterationType = z.infer<typeof FixedPointIteration>;
export type FixedPointRootsType = z.infer<typeof FixedPointRoots>;
export type FalseRuleParamsType = z.infer<typeof FalseRuleParams>;
export type FalseRuleIterationType = z.infer<typeof FalseRuleIteration>;
export type FalseRuleRootsType = z.infer<typeof FalseRuleRoots>;
export type SecanteParamsType = z.infer<typeof SecanteParams>;
export type SecanteIterationType = z.infer<typeof SecanteIteration>;
export type SecanteRootsType = z.infer<typeof SecanteRoots>;
export type SplineTypeType = z.infer<typeof SplineType>;
export type SplineParamsType = z.infer<typeof SplineParams>;
export type Spline_InputType = z.infer<typeof Spline_Input>;
export type VanderParamsType = z.infer<typeof VanderParams>;
export type VanderIntType = z.infer<typeof VanderInt>;
export type LagranParamsType = z.infer<typeof LagranParams>;
export type LagranIntType = z.infer<typeof LagranInt>;
export type NewtonParamsType = z.infer<typeof NewtonParams>;
export type NewtonIntType = z.infer<typeof NewtonInt>;
export type JacobiParamsType = z.infer<typeof JacobiParams>;
export type JacobiIterationType = z.infer<typeof JacobiIteration>;
export type JacobiResultType = z.infer<typeof JacobiResult>;
export type GaussSeidelParamsType = z.infer<typeof GaussSeidelParams>;
export type GaussSeidelIterationType = z.infer<typeof GaussSeidelIteration>;
export type GaussSeidelResultType = z.infer<typeof GaussSeidelResult>;
export type SORParamsType = z.infer<typeof SORParams>;
export type SORIterationType = z.infer<typeof SORIteration>;
export type SORResultType = z.infer<typeof SORResult>;